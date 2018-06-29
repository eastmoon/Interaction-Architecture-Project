// Library, march and assert
import Assert from "assert";
import {assertFunction} from "utils/assert";

// Singleton Library
import SimpleCommand from "framework/patterns/command/simple";
import MacroCommand from "framework/patterns/command/macro";

// Declared class or variable
class FakeCommand {
    execute() {
        this.msg = "fakeCommand";
    }
}

// Test case
describe('Framework.Patterns.Command, MacroCommand', function() {
    it('Macro command interface', function () {
        assertFunction(MacroCommand.prototype.register);
        assertFunction(MacroCommand.prototype.remove);
        assertFunction(MacroCommand.prototype.retrieve);
        assertFunction(MacroCommand.prototype.has);
        assertFunction(MacroCommand.prototype.execute);
    });
    it('Inherent & Constructor.', function () {
    });
    describe('Container register', () => {
        it('Case 1 : normal register', () => {
            let macro = new MacroCommand();
            macro.register(new SimpleCommand());
            macro.register(new SimpleCommand("TestSimpleCommand"));
            macro.register(new MacroCommand());
            macro.register(new MacroCommand("TestMacroCommand"));
            Assert.equal(macro.count, 4);
        });
        it('Case 2 : non-inherent command register', () => {
            let macro = new MacroCommand();
            macro.register(new SimpleCommand());
            macro.register(new FakeCommand());
            Assert.equal(macro.count, 1);
        });
        it('Case 3 : duplicate command register, register command has same name', () => {
            let macro = null;
            let simple = null;
            //
            macro = new MacroCommand();
            macro.register(new SimpleCommand());
            macro.register(new SimpleCommand());
            Assert.equal(macro.count, 1);
            //
            macro = new MacroCommand();
            simple = new SimpleCommand();
            macro.register(simple);
            macro.register(simple);
            Assert.equal(macro.count, 1);
        });
    });
    it('Container remove.', function () {
    });
    it('Container retrieve.', function () {
    });
    it('Container has.', function () {
    });
    it('Command execute.', function () {
    });
});
