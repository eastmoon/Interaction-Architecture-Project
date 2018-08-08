/*
Observer pattern, ref : https://en.wikipedia.org/wiki/Observer_pattern

Subject, also call Observable, it is a class which could register (attach), remove (detach) notification.
And Subject notify, all notification will execute update, and trigger handler function.

author: jacky.chen
*/
import BaseObject from "framework/patterns/base/object";
import Container from "framework/patterns/base/container";
import Notification from "./notification";

export default class Subject extends BaseObject {
    // When Subject generate, it need a name for subject, and only register Notification object in container.
    // Subject name will be an infromation pass to notification.
    constructor($name) {
        super($name);
        //
        this._container = new Container(Notification);
    }
    // Register a notification in subject.
    // @parma $handler, a handler which will trigger at notify execute. if handler is "function", new a Notification to holder, else will do nothing.
    // @param $name, a name when handler is "function" and auto-generate Notification will use it.
    register($handler, $name) {
        let notification = null;
        let name = "";
        // 1. Check handler type
        if (typeof $handler === "function") {
            // 1.1 Create a name by $name & $handler.name, it will duplicate at two was the same.
            name = `${$name}_${$handler.name}`;
            // 1.2 New a Notification to holder it.
            notification = new Notification(name, $handler, {
                name: this.name,
                subject: this,
                handler: $handler
            });

            this._container.register(notification);
        }
        return notification;
    }
    // Remove
    remove($handler, $name) {
        // 1.1 Create a name by $name & $handler.name
        const name = `${$name}_${$handler.name}`;
        return this._container.remove(name);
    }
    // Notify
    notify(...$args) {
        Object.keys(this._container.storage).forEach((key) => {
            const notification = this._container.storage[key];
            if (notification instanceof Notification) {
                notification.update(...$args);
            }
        });
    }

    // Accessor
    get count() {
        return this._container.count;
    }
}
