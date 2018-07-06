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

class Increase extends SimpleCommand {
    execute(args) {
        args.value += 1;
        args.msg = `${args.msg}I`;
        //console.log(args);
    }
}

class Decrease extends SimpleCommand  {
    execute(args) {
        args.value -= 1;
        args.msg = `${args.msg}D`;
        //console.log(args);
    }
}

// Test case
describe('Framework.Patterns.Command, MacroCommand', () => {
    it('Class method & Interface', () => {
        assertFunction(MacroCommand.prototype.register);
        assertFunction(MacroCommand.prototype.remove);
        assertFunction(MacroCommand.prototype.retrieve);
        assertFunction(MacroCommand.prototype.has);
        assertFunction(MacroCommand.prototype.execute);
    });
    it('Inherent & Constructor.', () => {
        let cmd = null;
        cmd = new MacroCommand();
        Assert.equal(cmd.name, "MacroCommand");
        cmd = new MacroCommand("Command");
        Assert.equal(cmd.name, "Command");
        Assert.equal(cmd.count, 0);
    });
    describe('Container register', () => {
        it('Case 1 : normal register', () => {
            const macro = new MacroCommand();
            macro.register(new SimpleCommand());
            macro.register(new SimpleCommand("TestSimpleCommand"));
            macro.register(new MacroCommand());
            macro.register(new MacroCommand("TestMacroCommand"));
            Assert.equal(macro.count, 4);
        });
        it('Case 2 : non-inherent command register', () => {
            const macro = new MacroCommand();
            macro.register(new SimpleCommand());
            macro.register(new FakeCommand());
            Assert.equal(macro.count, 1);
        });
        it('Case 3 : duplicate command register, register command has same name', () => {
            let macro = null;
            let simple = null;
            // register the same default name (class name)
            macro = new MacroCommand();
            macro.register(new SimpleCommand());
            macro.register(new SimpleCommand());
            Assert.equal(macro.count, 1);
            // register the same command
            macro = new MacroCommand();
            simple = new SimpleCommand();
            macro.register(simple);
            macro.register(simple);
            Assert.equal(macro.count, 1);
        });
    });
    describe('Container remove.', () => {
        it('Case 1 : normal remove', () => {
            const macro = new MacroCommand();
            const cmd1 = new SimpleCommand("COM1");
            const cmd2 = new SimpleCommand("COM2");
            macro.register(cmd1);
            macro.register(cmd2);
            Assert.equal(macro.count, 2);
            macro.remove(cmd2.name);
            Assert.equal(macro.count, 1);
            macro.remove(cmd1.name);
            Assert.equal(macro.count, 0);
        });
        it('Case 2 : duplicate remove the same name command', () => {
            const macro = new MacroCommand();
            const cmd1 = new SimpleCommand("COM1");
            const cmd2 = new SimpleCommand("COM2");
            macro.register(cmd1);
            macro.register(cmd2);
            Assert.equal(macro.count, 2);
            macro.remove(cmd2.name);
            Assert.equal(macro.count, 1);
            macro.remove(cmd2.name);
            Assert.equal(macro.count, 1);
        });
    });
    describe('Container retrieve.', function () {
        it('Case 1 : retrieve register command', () => {
            const macro = new MacroCommand();
            const cmd1 = new SimpleCommand("COM1");
            const cmd2 = new SimpleCommand("COM2");
            macro.register(cmd1);
            macro.register(cmd2);
            Assert.equal(macro.count, 2);
            Assert.equal(macro.retrieve(cmd1.name), cmd1);
            Assert.equal(macro.retrieve(cmd2.name), cmd2);
            Assert.equal(macro.count, 2);
        });
        it('Case 2 : retrieve non-register command', () => {
            const macro = new MacroCommand();
            const cmd1 = new SimpleCommand("COM1");
            const cmd2 = new SimpleCommand("COM2");
            // Random name will retrieve null.
            macro.register(cmd1);
            macro.register(cmd2);
            Assert.equal(macro.count, 2);
            Assert.notStrictEqual(macro.retrieve("Non-regisrer-name"), cmd1);
            Assert.notStrictEqual(macro.retrieve("Non-regisrer-name"), cmd2);
            Assert.equal(macro.retrieve("Non-regisrer-name"), null);
            // Remove object will retrieve null
            macro.remove(cmd2.name);
            Assert.equal(macro.count, 1);
            Assert.notStrictEqual(macro.retrieve(cmd2.name), cmd2);
            Assert.equal(macro.retrieve(cmd2.name), null);
        });
    });
    describe('Container has.', function () {
        it('Case 1 : macro has register command', () => {
            const macro = new MacroCommand();
            const cmd1 = new SimpleCommand("COM1");
            const cmd2 = new SimpleCommand("COM2");
            macro.register(cmd1);
            macro.register(cmd2);
            Assert.equal(macro.count, 2);
            Assert.ok(macro.has(cmd1.name) >= 0);
            Assert.ok(macro.has(cmd2.name) >= 0);
            Assert.equal(macro.count, 2);
        });
        it('Case 1 : macro has non-register command', () => {
            const macro = new MacroCommand();
            const cmd1 = new SimpleCommand("COM1");
            macro.register(cmd1);
            Assert.equal(macro.count, 1);
            Assert.ok(macro.has("Non-regisrer-name") < 0);
            Assert.equal(macro.count, 1);
        });
    });
    describe('Command execute.', function () {
        it('Case 1 : calculate by command', () => {
            const macro = new MacroCommand();
            const result = {
                value: 0,
                msg: ""
            };
            macro.register(new Increase("S1"));
            macro.register(new Increase("S2"));
            macro.register(new Decrease("S3"));
            macro.execute(result);
            Assert.equal(result.value, 1);
            //
            macro.register(new Decrease("S4"));
            macro.execute(result);
            Assert.equal(result.value, 1);
        });
        it('Case 2 : command is sequence execute.', () => {
            const macro = new MacroCommand();
            const result = {
                value: 0,
                msg: ""
            };
            macro.register(new Increase("S1"));
            macro.register(new Increase("S2"));
            macro.register(new Decrease("S3"));
            macro.execute(result);
            Assert.equal(result.msg, "IID");
            //
            macro.register(new Decrease("S4"));
            macro.execute(result);
            Assert.equal(result.msg, "IIDIIDD");
        });
        it('Case 3 : nested execute.', () => {
            const macro = new MacroCommand();
            const increase = new MacroCommand("IncreaseMacro");
            const decrease = new MacroCommand("DecreaseMacro");
            const result = {
                value: 0,
                msg: ""
            };
            //
            increase.register(new Increase("S1"));
            increase.register(new Increase("S2"));
            increase.register(new Increase("S3"));
            //
            decrease.register(new Decrease("S1"));
            decrease.register(new Decrease("S2"));
            //
            macro.register(increase);
            macro.register(decrease);
            macro.register(new Increase("S1"));
            macro.execute(result);
            Assert.equal(result.value, 2);
            Assert.equal(result.msg, "IIIDDI");
        });
    });
});
