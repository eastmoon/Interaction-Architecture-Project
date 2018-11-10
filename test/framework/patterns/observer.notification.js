// Library, march and assert
import Assert from "assert";
import {assertClass, assertFunction} from "utils/assert";

// Framework library
import Notification from "framework/patterns/observer/notification"

// Test function
function testHandler($info, $args1) {
    Assert.ok(typeof $info === "object");
    Assert.ok($info.Subject === "Custom.Subject");
    Assert.ok($info.Var === 123);
    $args1.A = "A";
    $args1.B = "B";
}
// Test case
describe("Framework.Patterns.Observer, Notification", () => {
    it("Class method & Interface", () => {
        assertClass(Notification)
        assertFunction(Notification.prototype.update);
    });
    it("Inherent & Constructor.", () => {
        const subjectInfo = {
            Subject: "Custom.Subject",
            Var: 123
        };
        const notify = new Notification("Custom.Name", testHandler, subjectInfo);
        Assert.ok(notify.name = "Custom.Name");
        Assert.ok(notify.info === subjectInfo);
        Assert.ok(notify.info.Subject === "Custom.Subject");
        Assert.ok(notify.info.Var === 123);
    });
    it("Trigger update.", () => {
        const subjectInfo = {
            Subject: "Custom.Subject",
            Var: 123
        };
        const temp = {
            A: "Z",
            B: "Z"
        }
        const notify = new Notification("Custom.Name", testHandler, subjectInfo);
        notify.update(temp);
        Assert.ok(temp.A === "A");
        Assert.ok(temp.B === "B");
    });
});
