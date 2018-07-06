// Library, march and assert
import Assert from "assert";
import {assertFunction} from "utils/assert";

// Singleton Library
import Container from "framework/patterns/facade/container";

// Declared class or variable
class TypeA {

}

class TypeB {

}

class TypeC {
    constructor($name) {
        this.name = $name;
    }
}

// Test case
describe('Framework.Patterns.Facade, Container', () => {
    it('Class method & Interface', () => {
        assertFunction(Container.prototype.register);
        assertFunction(Container.prototype.remove);
        assertFunction(Container.prototype.retrieve);
        assertFunction(Container.prototype.has);
    });
    it('Inherent & Constructor.', () => {
        let obj = null;
        obj = new Container();
        Assert.equal(obj.name, "Container");
        obj = new Container("MyContainer");
        Assert.equal(obj.name, "MyContainer");
        Assert.equal(obj.count, 0);
        Assert.equal(typeof obje.storage, "object");
    });
    describe('Container register', () => {
        it('Case 1 : non-limit register', () => {
            const container = new Container();
            Assert.ok(container.register(new TypeA()));
            Assert.ok(container.register("TestA", new TypeA()));
            Assert.ok(container.register(new TypeB()));
            Assert.ok(container.register("TestB", new TypeB()));
            Assert.equal(container.count, 4);
        });
        it('Case 2 : limit register', () => {
            const container = new Container(TypeA);
            Assert.ok(container.register(new TypeA()));
            Assert.ok(container.register("TestA", new TypeA()));
            Assert.ok(!container.register(new TypeB()));
            Assert.ok(!container.register("TestB", new TypeB()));
            Assert.equal(container.count, 2);
        });
        it('Case 3 : duplicate object registration, it mean register object have the same name.', () => {
            let container = null;
            //
            container = new Container(TypeA);
            Assert.ok(container.register(new TypeA()));
            Assert.ok(!container.register(new TypeA()));
            Assert.equal(container.count, 1);
            //
            container = new Container(TypeA);
            Assert.ok(container.register("TestA", new TypeA()));
            Assert.ok(!container.register("TestA", new TypeA()));
            Assert.equal(container.count, 1);
        });
    });
    describe('Container remove.', () => {
        it('Case 1 : remove object that have registration', () => {
            const container = new Container();
            const obj1 = new TypeC("OBJ1");
            const obj2 = new TypeC("OBJ2");
            container.register(obj1);
            container.register(obj2);
            Assert.equal(container.count, 2);
            Assert.equal(container.remove(obj1.name), obj1);
            Assert.equal(container.count, 1);
            Assert.equal(container.remove(obj2), obj2);
            Assert.equal(container.count, 0);
        });
        it('Case 2 : duplicate remove the same name object', () => {
            const container = new Container();
            const obj1 = new TypeC("OBJ1");
            const obj2 = new TypeC("OBJ2");
            container.register(obj1);
            container.register(obj2);
            Assert.equal(container.count, 2);
            Assert.equal(container.remove(obj2.name), obj2);
            Assert.equal(container.count, 1);
            Assert.equal(container.remove(obj2), null);
            Assert.equal(container.count, 1);
        });
    });
    describe('Container retrieve.', () => {
        it('Case 1 : retrieve object that have registration', () => {
            const container = new Container();
            const obj1 = new TypeC("OBJ1");
            const obj2 = new TypeC("OBJ2");
            container.register(obj1);
            container.register(obj2);
            Assert.equal(container.count, 2);
            Assert.equal(container.retrieve(obj1.name), obj1);
            Assert.equal(container.retrieve(obj2), obj2);
            Assert.equal(container.count, 2);
        });
        it('Case 2 : retrieve non-register object', () => {
            const container = new Container();
            const obj1 = new TypeC("OBJ1");
            const obj2 = new TypeC("OBJ2");
            // Random name will retrieve null.
            container.register(obj1);
            container.register(obj2);
            Assert.equal(container.count, 2);
            Assert.notStrictEqual(container.retrieve("Non-regisrer-name"), obj1);
            Assert.notStrictEqual(container.retrieve("Non-regisrer-name"), obj2);
            Assert.equal(container.retrieve("Non-regisrer-name"), null);
            // Remove object will retrieve null
            container.remove(obj2.name);
            Assert.equal(container.count, 1);
            Assert.notStrictEqual(container.retrieve(obj2), obj2);
            Assert.equal(container.retrieve(obj2), null);
        });
    });
    describe('Container has.', () => {
        it('Case 1 : container has object that have registration', () => {
            const container = new Container();
            const obj1 = new TypeC("OBJ1");
            const obj2 = new TypeC("OBJ2");
            container.register(obj1);
            container.register(obj2);
            Assert.equal(container.count, 2);
            Assert.ok(container.has(obj1.name));
            Assert.ok(container.has(obj2));
            Assert.equal(container.count, 2);
        });
        it('Case 1 : container not have non-registration object', () => {
            const container = new Container();
            const obj1 = new TypeC("OBJ1");
            container.register(obj1);
            Assert.equal(container.count, 1);
            Assert.ok(!container.has("Non-regisrer-name"));
            Assert.equal(container.count, 1);
        });
    });
});
