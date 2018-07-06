// Library, march and assert
import Assert from "assert";

// Singleton Library
import Singleton from "framework/patterns/singleton";

// Declared class or variable
class ChildrenSingleton extends Singleton {
    initial() {
        super.initial();
        this.value = 123;
    }
}

class ChildrenSingletonRename extends Singleton {
    // it will work if complie
    static get appName() {
        return "RenameSingleton";
    }
}

// Test case
describe('Framework.Patterns.Singleton, CrossIframeSingleton', () => {
    it('Class method & Interface', () => {
        Assert.ok(typeof Singleton.appName !== "undefined" && typeof Singleton.appName === "string");
        Assert.ok(typeof Singleton.instance !== "undefined" && typeof Singleton.instance === "object");
    });
    it('Inherent Singleton.', () => {
        Assert.equal(Singleton.appName, "CrossIframeSingleton");
        Assert.equal(ChildrenSingleton.appName, "ChildrenSingleton");
        Assert.equal(ChildrenSingletonRename.appName, "RenameSingleton");
    });
    it('Singleton object is only one.', () => {
        Assert.notEqual(Singleton, ChildrenSingleton);
        Assert.equal(new ChildrenSingleton(), ChildrenSingleton.instance);
        Assert.equal(ChildrenSingleton.instance.value, 123);
        Assert.equal(new ChildrenSingleton().value, 123);
    });
});
