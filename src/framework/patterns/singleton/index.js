/*
Singleton pattern, which could cross iframe, make different page call the same singleton object.

author: jacky.chen

fix :
CustomEvent (IE problem)
*/

// Declared class private variable.
let instances = {};
let rootWin = null;

// Cross iframe page singleton pattern
// 0. Define retrieve root window function
function getRootWindow() {
    let win = typeof window === "undefined" ? null : window;
    try {
        // 0. declared variable
        let doc = document;
        // let par = win.parent.document;
        let par = win.parent.document;
        // 1. find root document.
        while (doc !== par) {
            win = win.parent;
            doc = par;
            par = win.parent.document;
        }
    } catch (err) {
        // error code : 18, SecurtityError, webkit cross cross domain error. When website call parent, but parent is webkit.
    }
    return win;
}


// 1. Define retrieve instance mapping object function.
// 1-1. using root window to saving all singleton class instance.
// 1-2. every iframe have one singleton class, and it need  retrieve instance mapping object from root window.
function getRootInstance() {
    // f0. declared variable
    const win = getRootWindow();
    let result = instances;
    if (win) {
        // let firstCreateFlag = false;
        const event = new CustomEvent("SingletonRetrieveInstances", {"instances": null});
        if (win === window) {
            // f1. if owner window is root, add event listancer
            // f1-1. create root instance mapping
            result = instances;
            // f1-2. add event listancer, that children could retrieve instance mapping
            win.addEventListener(event.type, ($event) => {
                $event.instances = instances;
            });
        } else {
            // f2. if owner window is not root, retrieve instance mapping from root by custom event.
            // f2-1. retrieve instance mapping object, if right window is children window.
            win.dispatchEvent(event);
            result = event.instances;
        }
    }
    return result;
}

// 2. retrieve instance mapping object
instances = getRootInstance();
rootWin = getRootWindow();

// Singleton class
export default class CrossIframeSingleton {
    // Class Constructor method
    constructor() {
        // Set object isn't first create
        // Make sure every time new object will be the same instance
        // Ref : http://amanvirk.me/singleton-classes-in-es6/
        // In here, this is instance object.
        if (typeof instances[this.constructor.appName] === "undefined" || instances[this.constructor.appName] === null) {
            instances[this.constructor.appName] = this;
            this.initial();
        }
        return instances[this.constructor.appName];
    }

    // Template method, it will initially this class variable or setting.
    initial() {
        this._window = getRootWindow();
    }

    // singleton pattern class static method
    static get instance() {
        // Set object isn't first create
        this._firstCreateFlag = false;
        // Class.instance, use static attribute to retrieve instance
        // In here, this is class defined.
        if (typeof instances[this.appName] === "undefined" || instances[this.appName] === null) {
            instances[this.appName] = new this();
        }
        return instances[this.appName];
    }

    // Static Accessor
    static get appName() {
        // if javascript compile use uglify, it will make appName non-identity.
        // At that time, override this static accessor.
        return this.name;
    }

    // Accessor
    get window() {
        return this._window;
    }
}

// Export variable
export const rootWindow = rootWin;
