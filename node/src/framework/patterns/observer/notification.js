/*
Observer pattern, ref : https://en.wikipedia.org/wiki/Observer_pattern

Notification, also call observer, change this name, because it is a notify trigger and information set, using in subject.

author: jacky.chen
*/
import BaseObject from "framework/patterns/base/object";

export default class Notification extends BaseObject {
    // When Notification generate, it need a name, and event handler, and information from subject.
    constructor($name, $handler = null, $info = null) {
        super($name);
        //
        if (typeof $handler === "function") {
            this._handler = $handler;
            this._info = $info;
        } else {
            this._handler = null;
            this._info = null;
        }
    }

    // Update, trigger observer handler and passing subject information.
    update(...$args) {
        if (this._handler) {
            this._handler(this.info, ...$args);
        }
    }

    // Accessor
    get info() {
        return this._info;
    }
}
