/*
Singleton pattern.

ref: https://en.wikipedia.org/wiki/Singleton_pattern
author: jacky.chen
*/

let instances = {};

// Singleton class
export default class LocalSingleton {
    constructor() {
        // Set object isn't first create
        // Make sure every time new object will be the same instance
        // In here, this is instance object.
        if (typeof instances[this.constructor.appName] === "undefined" || instances[this.constructor.appName] === null) {
            instances[this.constructor.appName] = this;
            this.install();
        }
        return instances[this.constructor.appName];
    }
    static get instance() {
        // Class.instance, use static attribute to retrieve instance
        if (typeof instances[this.appName] === "undefined" || instances[this.appName] === null) {
            instances[this.appName] = new this();
        }
        return instances[this.appName];
    }
    install() {
        this._window = widnow ? window : null;
    }
    // Accessor
    get window() {
        return this._window;
    }
}
