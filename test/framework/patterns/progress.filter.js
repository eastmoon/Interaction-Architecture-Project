// Library, march and assert
import Assert from "assert";
import {assertClass, assertFunction} from "utils/assert";

// Framework library
import Command from "framework/patterns/command/simple";
import Filter from "framework/patterns/progress/filter";

// Test class
class TestFilter extends Filter {
    execute(...$args) {
        Assert.equal($args.length, 3);
        Assert.ok(typeof $args[0] === "object");
        Assert.ok(typeof $args[1] === "function");
        Assert.ok(typeof $args[2] === "function");
    }
}

class ResolveFilter extends Filter {
    constructor(...$args) {
        super($args);
        this.result = "";
    }
    execute($progress, $resolve, $reject) {
        this.result += `${$progress}-${this.name}`;
        $resolve($progress);
    }
}

class RejectFilter extends Filter {
    constructor(...$args) {
        super($args);
        this.result = "";
    }
    execute($progress, $resolve, $reject) {
        $reject($progress);
    }
    fail($error) {
        Assert.ok(typeof $error === "string");
        Assert.equal($error, "AsyncExecute");
    }
}


// Test case
describe("Framework.Progress, Filter", () => {
    it("Class method & Interface", () => {
        assertClass(Filter)
        assertFunction(Filter.prototype.asyncExecute);
        assertFunction(Filter.prototype.execute);
        assertFunction(Filter.prototype.fail);
    });
    it("Inherent & Constructor.", () => {
        const filter = new Filter("Custom.Name");
        Assert.equal(filter.name, "Custom.Name");
        Assert.ok(filter instanceof Command);
    });
    describe("Asynchronous execution.", () => {
        it("Returen promise object, and execute assignment variable.", () => {
            const filter = new TestFilter();
            Assert.ok(filter.asyncExecute({}) instanceof Promise);
        });
        it("Resolve test", () => {
            const filtername = "Resolve.Filter";
            const progressParam = "AsyncExecute";
            const filter = new ResolveFilter(filtername);
            const async = filter.asyncExecute(progressParam).then((response) => {
                Assert.equal(response, progressParam);
                Assert.ok(typeof filter.result === "string");
                Assert.ok(filter.result.includes(filtername));
                Assert.ok(filter.result.includes(progressParam));
                Assert.equal(filter.result, `${progressParam}-${filtername}`);
            });
            Assert.ok(async instanceof Promise);
            return async;
        });
        it("Reject test", () => {
            try{
                const filter = new RejectFilter();
                const async = filter.asyncExecute("AsyncExecute");
                Assert.ok(async instanceof Promise);
            } catch(error) {
                Assert.equal(error, "AsyncExecute");
            }

        });
    });
});
