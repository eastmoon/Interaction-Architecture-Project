// Library, march and assert
import Assert from "assert";
import {assertClass, assertFunction} from "utils/assert";

// Framework Library
import Proxy, {PROXY_UPDATE} from "framework/patterns/proxy";

// Test class & function
class A extends Proxy {}
A.proxyDefined = {
    x: 852,
    y: 951,
    z: 753
}

function foo($notify, $proxy) {
    //console.log("Function Foo");
    Assert.equal($proxy.x, 123);
    Assert.equal($proxy.y, 951);
    Assert.equal($proxy.z, 753);
    $proxy.count += 10;
}

function tar($notify, $proxy) {
    //console.log("Function Bar");
    Assert.equal($proxy.x, 123);
    Assert.equal($proxy.y, 951);
    Assert.equal($proxy.z, 753);
    $proxy.count += 1;
}

function bar($notify, $proxy) {
    //console.log("Function Bar");
    Assert.equal($proxy.t, 789);
    $proxy.x = 123;
    $proxy.count += 5;
}

function add($notify, $proxy) {
    //console.log("Function Bar");
    $proxy.count += 1;
}

// Test case
describe('Framework.Patterns.Proxy', () => {
    it('Class method & Interface', () => {
        assertClass(Proxy);
        assertFunction(Proxy.prototype.observe);
        assertFunction(Proxy.prototype.removeObserve);
    });
    describe('Inherent & Constructor.', () => {
        it(`Proxy initial with proxyDefined`, () => {
            class B extends Proxy {}
            B.proxyDefined = {
                x: 123,
                y: 456,
                z: 789
            };
            const proxy = new B();
            Assert.equal(proxy.x, 123);
            Assert.equal(proxy.y, 456);
            Assert.equal(proxy.z, 789);
        });
        it(`Proxy initial with set() method`, () => {
            const proxy = new A();
            proxy.set({
                x: 123,
                y: 456,
                z: 789
            });
            Assert.equal(proxy.x, 123);
            Assert.equal(proxy.y, 456);
            Assert.equal(proxy.z, 789);
        });
        it(`Proxy initial mixing proxyDefault and set() method`, () => {
            class B extends Proxy {}
            B.proxyDefined = {
                i: "ABC",
                j: "DEF"
            }
            const proxy = new B();
            proxy.set({
                x: 123,
                y: 456,
                z: 789
            });
            Assert.equal(proxy.i, "ABC");
            Assert.equal(proxy.j, "DEF");
            Assert.equal(proxy.x, 123);
            Assert.equal(proxy.y, 456);
            Assert.equal(proxy.z, 789);
        });
    });
    describe('Observe proxy attribute', () => {
        it(`Observe one attribute, and check result change.`, () => {
            const proxy = new A();
            proxy.set({count: 0});
            Assert.equal(proxy.x, 852);
            Assert.equal(proxy.y, 951);
            Assert.equal(proxy.z, 753);
            proxy.observe("x", foo, "window");
            proxy.x = 123;
            Assert.equal(proxy.count, 10);
        });
        it(`Observe multi-attribute, and use one to trigger another.`, () => {
            const proxy = new A();
            proxy.set({t: 0, count: 0});
            Assert.equal(proxy.x, 852);
            Assert.equal(proxy.y, 951);
            Assert.equal(proxy.z, 753);
            proxy.observe("x", foo, "window");
            proxy.observe("t", bar, "window");
            proxy.t = 789;
            Assert.equal(proxy.count, 15);
        });
        it(`Change attribute, and notify all nodes by path.`, () => {
            const proxy = new A();
            proxy.set({i: {j: {a: 123, b: 123}}, count: 0});
            Assert.equal(proxy.i.j.a, 123);
            Assert.equal(proxy.i.j.b, 123);
            proxy.observe("i", add, "window");
            proxy.observe("i.j", add, "window");
            proxy.i.j.a = 456;
            Assert.equal(proxy.count, 2);
            Assert.equal(proxy.i.j.a, 456);
            Assert.equal(proxy.i.j.b, 123);
        });
        it(`Observe at set method`, () => {
            const proxy = new A();
            proxy.set({i: {a: 123, b: 123}, count: 0});
            Assert.equal(proxy.i.a, 123);
            Assert.equal(proxy.i.b, 123);
            proxy.observe("i", add, "window");
            proxy.observe("i.a", add, "window");
            const temp = {i: {a: 456, b:789}};
            //const temp = proxy.get().setIn(["i", "a"], 456).setIn(["i", "b"], 789);
            proxy.set(temp);
            Assert.equal(proxy.count, 2);
            Assert.equal(proxy.i.a, 456);
            Assert.equal(proxy.i.b, 789);
        });
        it(`Observe at OBSERVE.UPDATE`, () => {
            const proxy = new A();
            proxy.observe(PROXY_UPDATE, ($notify, $proxy) => {
                Assert.equal($notify.name, PROXY_UPDATE);
                Assert.equal($proxy.x, 123);
                Assert.equal($proxy.y, 123);
                Assert.equal($proxy.z, 123);
            }, "window");
            proxy.x = 123;
            proxy.y = 123;
            proxy.z = 123;
        });
        it(`Observe will not notify if data not-changed.`, () => {
              const proxy = new A();
              proxy.set({count: 0});
              proxy.observe("x", add, "window");
              proxy.observe("y", add, "window");
              proxy.observe("z", add, "window");
              // set method
              proxy.set({
                x: 852,
                y: 951,
                z: 753
              })
              Assert.equal(proxy.count, 0);
              // set property
              proxy.x = 852;
              proxy.y = 951;
              proxy.z = 753;
              Assert.equal(proxy.count, 0);
        });
    });
    describe('Remove observe', () => {
        it(`Remove one by one.`, () => {
            // initial
            const proxy = new A();
            proxy.set({count: 0});
            // check observe
            Assert.equal(proxy.x, 852);
            Assert.equal(proxy.y, 951);
            Assert.equal(proxy.z, 753);
            proxy.observe("x", foo, "window");
            proxy.observe("x", add, "window");
            proxy.x = 123;
            Assert.equal(proxy.count, 11);
            // remove one
            proxy.count = 0;
            proxy.removeObserve("x", foo, "window");
            proxy.x = 456;
            Assert.equal(proxy.count, 1);
            // remove other one
            proxy.set({count: 0});
            proxy.removeObserve("x", add, "window");
            proxy.x = 789;
            Assert.equal(proxy.count, 0);
        });
        it(`Remove subject.`, () => {
            // initial
            const proxy = new A();
            proxy.set({count: 0});
            // check observe
            Assert.equal(proxy.x, 852);
            Assert.equal(proxy.y, 951);
            Assert.equal(proxy.z, 753);
            proxy.observe("x", foo, "window");
            proxy.observe("x", tar, "window");
            proxy.x = 123;
            Assert.equal(proxy.count, 11);
            // remove subject
            proxy.count = 0;
            proxy.removeObserve("x");
            proxy.x = 123;
            Assert.equal(proxy.count, 0);
        });
    });
});
