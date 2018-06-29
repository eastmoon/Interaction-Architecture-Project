// Library, march and assert
import Assert from "assert";

// Detected variable is function or not.
export function assertFunction($var) {
    Assert.ok($var !== null && typeof $var !== "undefined" && typeof $var === "function");
}
