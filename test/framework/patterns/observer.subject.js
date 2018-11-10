// Library, march and assert
import Assert from "assert";
import {assertClass, assertFunction} from "utils/assert";

// Framework library
import Subject from "framework/patterns/observer/subject"

// Test class & function
class A {
    foo($event, $args) {
        Assert.equal($event.name, "Custom.Name");
        Assert.equal($args.var1, 123);
        Assert.equal($args.var2, 456);
        $args.var0 += 1;
    }
    bar($event, $args) {
        Assert.equal($event.name, "Custom.Name");
        Assert.equal($args.var1, 123);
        Assert.equal($args.var2, 456);
        $args.var0 += 5;
    }
}

function foo($event, $args) {
    Assert.equal($event.name, "Custom.Name");
    Assert.equal($args.var1, 123);
    Assert.equal($args.var2, 456);
    $args.var0 += 10;
}

// Test case
describe("Framework.Patterns.Observer, Subject", () => {
    it("Class method & Interface", () => {
        assertClass(Subject)
        assertFunction(Subject.prototype.register);
        assertFunction(Subject.prototype.remove);
        assertFunction(Subject.prototype.notify);
    });
    it("Inherent & Constructor.", () => {
        const subject = new Subject("Custom.Name");
        Assert.ok(subject.name = "Custom.Name");
    });
    describe("Register notification", () => {
        it(`Normal register at function`, () => {
            const subject = new Subject("Custom.Name");
            const notification = subject.register(foo, "TestFun");
            Assert.equal(notification.name, "TestFun_foo");
            Assert.equal(notification.info.name, "Custom.Name");
            Assert.equal(notification.info.subject, subject);
            Assert.equal(notification.info.handler, foo);
            Assert.equal(subject.count, 1);
        });
        it(`Normal register at class method`, () => {
            const test = new A();
            const subject = new Subject("Custom.Name");
            const notification = subject.register(test.foo, test.constructor.name);
            Assert.equal(notification.name, "A_foo");
            Assert.equal(notification.info.name, "Custom.Name");
            Assert.equal(notification.info.subject, subject);
            Assert.equal(notification.info.handler, test.foo);
            Assert.equal(subject.count, 1);
        });
        it(`Replacement register`, () => {
            const test = new A();
            const subject = new Subject("Custom.Name");
            const oldNotification = subject.register(test.foo, test.constructor.name);
            Assert.equal(subject.count, 1);
            const newNotification = subject.register(test.foo, test.constructor.name);
            Assert.equal(subject.count, 1);
            Assert.notEqual(oldNotification, newNotification);
            subject.register(test.foo, "Test");
            Assert.equal(subject.count, 2);
            subject.register(test.bar, test.constructor.name);
            Assert.equal(subject.count, 3);
        });
    });
    describe("Remove notification", () => {
        it(`Normal remove`, () => {
            const subject = new Subject("Custom.Name");
            const notification = subject.register(foo, "TestFun");
            Assert.equal(subject.count, 1);
            Assert.equal(notification, subject.remove(foo, "TestFun"));
            Assert.equal(subject.count, 0);

        });
        it(`Remove empty target`, () => {
            const subject = new Subject("Custom.Name");
            Assert.equal(subject.count, 0);
            Assert.equal(null, subject.remove(foo, "TestFun"));
            Assert.equal(subject.count, 0);
        });
        it(`Remove same name target, because function could not know who is the bind object.`, () => {
            const test = new A();
            const subject = new Subject("Custom.Name");
            const notification = subject.register(test.foo, "Test");
            Assert.equal(subject.count, 1);
            Assert.equal(notification, subject.remove(foo, "Test"));
            Assert.equal(subject.count, 0);
        });
        it(`Remove all notification`, () => {
            const test = new A();
            const subject = new Subject("Custom.Name");
            subject.register(test.foo, "Test");
            subject.register(test.bar, "Test");
            Assert.equal(subject.count, 2);
            subject.removeAll();
            Assert.equal(subject.count, 0);
        });
    });
    it(`Notify event`, () => {
        const test = new A();
        const subject = new Subject("Custom.Name");
        const result = {
            var0: 0,
            var1: 123,
            var2: 456
        }
        subject.register(foo, "Test");
        subject.register(test.foo, test.constructor.name);
        subject.register(test.bar, test.constructor.name);
        subject.notify(result);
        Assert.equal(result.var0, 16);
    });
});
