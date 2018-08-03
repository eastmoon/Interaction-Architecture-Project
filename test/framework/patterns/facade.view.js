// Library, march and assert
//import Assert from "assert";
import {assertFunction} from "utils/assert";

// Framework library
import Views from "framework/patterns/facade/views";

// Test case
describe('Framework.Patterns.Facade, View', () => {
    it('Class method & Interface', () => {
        assertFunction(Views.prototype.register);
        assertFunction(Views.prototype.remove);
        assertFunction(Views.prototype.retrieve);
        assertFunction(Views.prototype.has);
    });
    it('Inherent & Constructor.', () => {
    });
});
