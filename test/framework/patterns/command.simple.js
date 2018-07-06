// Library, march and assert
import Assert from "assert";
import {assertFunction} from "utils/assert";

// Singleton Library
import SimpleCommand from "framework/patterns/command/simple";

// Declared class or variable
class TestCommand extends SimpleCommand {
    execute() {
        this.value = 123;
    }
}

class RenameCommand extends SimpleCommand {
    constructor() {
        super("RenameAtConstructor")
    }
}

// Test case
describe('Framework.Patterns.Command, SimpleCommand', () => {
    it('Class method & Interface', () => {
        assertFunction(SimpleCommand.prototype.execute);
    });
    it('Inherent & Constructor.', () => {
        let cmd = null;
        cmd = new SimpleCommand();
        Assert.equal(cmd.name, "SimpleCommand");
        cmd = new TestCommand("Command");
        Assert.equal(cmd.name, "Command");
        cmd = new RenameCommand();
        Assert.equal(cmd.name, "RenameAtConstructor");
    });
    it('Command execute', () => {
        const cmd = new TestCommand();
        Assert.ok(typeof cmd.value === "undefined");
        cmd.execute();
        Assert.equal(cmd.value, 123);
    });
});
