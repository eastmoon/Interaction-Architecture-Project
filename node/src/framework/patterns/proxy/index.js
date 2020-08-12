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

export const PROXY_UPDATE = "framewrok.patterns.proxy.update";
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
        this._updatetimer = null;
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

    // Overriding set method
    set($data) {
        // 1. Save data with parent set method, and retrieve JS object which saving in proxy.
        const origin = this.get();
        const data = super.set($data);
        if (!this.equals(origin)) {
            // 2. Resolve node path in data.
            const token = this._resolveTokenInObject($data);
            // 3. Notify
            this._notify(token);
        }

    }
    // Resolve
    _resolveTokenInObject($data, $node = null) {
        let result = [];
        Object.keys($data).forEach((key) => {
            // 1. if value is JS object, call recursive function _resolveTokenInObject to resolve node path.
            if (typeof $data[key] === "object") {
                result = result.concat(this._resolveTokenInObject(
                  $data[key],
                  $node ? `${$node}.${key}` : key
                ));
            }
            // 2. Saving current node path.
            result.push($node ? `${$node}.${key}` : key);
        });
        return result;
    }
    // Overriding set property method
    _setProperty($args) {
        // 1. Save data with parent set accessor.
        const origin = this.get();
        super._setProperty($args);
        if (!this.equals(origin)) {
            // 2. Notify this token, if token have some handler observer.
            // When notify happen, every node in attribute path will check and trigger notification.
            let token = null;
            if ($args.node) {
                let node = $args.node.concat($args.key);
                let temp = "";
                token = [];
                node.forEach((value, index) => {
                    temp = index ? `${temp}.${value}` : value;
                    token.push(temp);
                });
            } else {
                token = [$args.key];
            }
            //console.log("Proxy set property", token);
            // 3. Noityf by token.
            this._notify(token);
        }
    }

    // Notify with input token
    // Input token will be a string array, every string is a attribute path.
    _notify($token) {
        if (this._observable && $token.length > 0) {
            // 1. if token have a subject observe, trigger notify.
            $token.forEach((value) => {
                let subject = this._observable.retrieve(value);
                if (subject) {
                    subject.notify(this);
                }
            });

            // 2. notify is call, it mean proxy data have change.
            // It will trigger a PROXY_UPDATE notify, when last proxy data change and after 0.1 ms.
            // NOTE : 0.1 ms is a hypothesis value, it mean every proxy data change in function or algorithm will interval in this value.
            // So, if out of this value, it will update many time in function.
            if (this._updatetimer) {
                clearTimeout(this._updatetimer);
            }
            this._updatetimer = setTimeout(() => {
                let subject = this._observable.retrieve(PROXY_UPDATE);
                if (subject) {
                    subject.notify(this);
                }
            }, 0.1);
        }
    }
}
