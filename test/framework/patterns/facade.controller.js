// Library, march and assert
//import Assert from "assert";
import {assertFunction} from "utils/assert";

// Framework library
import Controllers from "framework/patterns/facade/controllers";

// Test case
describe("Framework.Patterns.Facade, Controller", () => {
    it("Class method & Interface", () => {
        assertFunction(Controllers.prototype.register);
        assertFunction(Controllers.prototype.remove);
        assertFunction(Controllers.prototype.has);
        assertFunction(Controllers.prototype.execute);
    });
    it("Inherent & Constructor.", () => {
    });
});
