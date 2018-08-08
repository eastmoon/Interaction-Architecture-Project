// Library, march and assert
import Assert from "assert";
import {assertClass} from "utils/assert";

// Framework library
import Observer from "framework/patterns/observer"

// Test case
describe('Framework.Patterns.Observer', () => {
    it('Class method & Interface', () => {
        assertClass(Observer);
        assertClass(Observer.Subject);
        assertClass(Observer.Notification);
    });
    it('Inherent & Constructor.', () => {
        const observer = new Observer();
        Assert.ok(Object.getOwnPropertyNames(observer).length === 0, "Observer is a package for module.");
        const subject = new Observer.Subject();
        Assert.ok(subject instanceof Observer.Subject && subject instanceof Object);
        const notification = new Observer.Notification();
        Assert.ok(notification instanceof Observer.Notification && notification instanceof Object);
    });
});
