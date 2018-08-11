/*
Proxy pattern, ref : https://en.wikipedia.org/wiki/Proxy_pattern

Proxy is a middle class, which is like a algorithm agent, hidden algorithm, storage variable.
In MVC framework, Proxy will call by View or Controller, and Proxy will using kernel tools to connection with remote server, local storage, file I/O etc.
When Proxy state is change, it will notify to any traget who want to know.

Proxy will have an ability like :
  1. Observer
  2. Immutable (not necessary, it need to use because javascript object deep-copy using pass by reference)
  3. Dynamic get/set attribute, and reflection method.

author: jacky.chen
*/
import Container from "framework/patterns/base/container";
import Adapter from "framework/patterns/adapter";
import Observer from "framework/patterns/observer";

export default class Proxy extends Adapter.Immutable {
    constructor($name) {
        // 1. Call parent
        super($name);
        // 2. Initial proxy
        //console.log("Generate Proxy", this.constructor.proxyDefined);
        if (this.constructor.proxyDefined !== null && typeof this.constructor.proxyDefined !== "undefined") {
            this.set(this.constructor.proxyDefined);
        }
        // 3. Initial observable object, it was a container which will register Observer.Subject.
        this._observable = new Container(Observer.Subject);
    }

    // Observe accessor
    // @param subject, a subject name, which is one accessor in this proxy.
    // @param handler, when observe subject notify, this handler function will execute.
    // @param name, a name to identify this handler.
    observe($subject, $handler, $name) {
        // 0. Check input parameter
        if ($subject !== null && typeof $subject !== "string") {
            return ;
        }
        if ($handler !== null && typeof $handler !== "function") {
            return ;
        }
        if ($name !== null && typeof $name !== "string") {
            return ;
        }
        // 1. if subject didn't exsit than generate it, else retrieve it.
        let subject = null;
        if (this._observable.has($subject)) {
            subject = this._observable.retrieve($subject);
        } else {
            subject = new Observer.Subject($subject);
            this._observable.register(subject);
        }
        // 2. register handler into subject.
        subject.register($handler, $name);
    }

    // Remove Observe accessor
    // @param subject, a subject name, which is one accessor in this proxy.
    // @param handler, when observe subject notify, this handler function will execute.
    // @param name, a name to identify this handler.
    // NOTE: When handler and name is null, it mean remove a subject in observable.
    removeObserve($subject, $handler = null, $name = null) {
          // 0. Check input parameter
          if ($subject !== null && typeof $subject !== "string") {
              return;
          }
          // 1. Retrieve subject and remove one notification or all.
          let subject = this._observable.retrieve($subject);
          if (subject) {
              // 1. if handler and name is null, remove subject.
              if ($handler !== null && typeof $handler === "function" && $name !== null && typeof $name === "string") {
                  subject.remove($handler, $name);
              }
              if ($handler === null && $name === null) {
                  subject.removeAll();
              }
          }
    }

    // Overriding set property method
    _setProperty($args) {
        // 1. Save data with parent set accessor.
        super._setProperty($args);
        // 2. Notify this token, if token have some handler observer.
        let token = null;
        if ($args.node) {
            token = `${$args.node}.${$args.key}`;
        } else {
            token = $args.key;
        }
        //console.log("Proxy set property", token);
        // 3. Retrieve subject by token.
        let subject = this._observable.retrieve(token);
        if (subject) {
            subject.notify(this);
        }
    }
}
