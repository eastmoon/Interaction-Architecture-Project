// Library, march and assert
import Assert from "assert";
import {assertFunction} from "utils/assert";

// Singleton Library
import BaseObject from "framework/patterns/base/object";

// Declared class or variable
class RenameObject extends BaseObject {
    constructor() {
        super("RenameObject")
    }
}

// Test case
describe('Framework.Patterns.Base, BaseObject', () => {
    it('Class method & Interface', () => {
    });
    it('Inherent & Constructor.', () => {
        let cmd = null;
        cmd = new BaseObject();
        Assert.equal(cmd.name, "BaseObject");
        cmd = new BaseObject("CustomObject");
        Assert.equal(cmd.name, "CustomObject");
        cmd = new RenameObject();
        Assert.equal(cmd.name, "RenameObject");
    });
});
