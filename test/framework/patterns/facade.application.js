// Library, march and assert
import Assert from "assert";

// Framework library
import Application from "framework/patterns/facade/application";
import Models from "framework/patterns/facade/models";
import Views from "framework/patterns/facade/views";
import Controllers from "framework/patterns/facade/controllers";

// Test case
describe('Framework.Patterns.Facade, Application', () => {
    it('Class method & Interface', () => {
        Assert.ok(typeof Application.appName !== "undefined" && typeof Application.appName === "string");
        Assert.ok(typeof Application.instance !== "undefined" && typeof Application.instance === "object");
        Assert.ok(typeof Application.models !== "undefined" && Application.models instanceof Models);
        Assert.ok(typeof Application.views !== "undefined" && Application.views instanceof Views);
        Assert.ok(typeof Application.controllers !== "undefined" && Application.controllers instanceof Controllers);
    });
    it('Inherent & Constructor.', () => {
    });
});
