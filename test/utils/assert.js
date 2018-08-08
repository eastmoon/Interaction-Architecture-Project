// Library, march and assert
import Assert from "assert";

// Detected variable is function or not.
export function assertFunction($var) {
    Assert.ok($var !== null && typeof $var !== "undefined" && typeof $var === "function");
}

// Detected variable is class or not.
// In JavaScript, class also call factory function, and mostly it has the same detected with function.
// Ref : https://medium.com/javascript-scene/2f22ceddf33e
export function assertClass($var) {
    Assert.ok($var !== null && typeof $var !== "undefined" && typeof $var === "function");
    Assert.ok(typeof $var.constructor === "function");
    Assert.ok(typeof $var.name === "string");
    Assert.ok(typeof $var.prototype === "object");
}
