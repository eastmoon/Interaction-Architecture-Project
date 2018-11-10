// Library, march and assert
//import Assert from "assert";
import {assertFunction} from "utils/assert";

// Framework library
import Models from "framework/patterns/facade/models";
// import Proxy from "";

// Test case
describe("Framework.Patterns.Facade, Model", () => {
    it("Class method & Interface", () => {
        assertFunction(Models.prototype.register);
        assertFunction(Models.prototype.remove);
        assertFunction(Models.prototype.retrieve);
        assertFunction(Models.prototype.has);
    });
    it("Inherent & Constructor.", () => {
        
    });
});
