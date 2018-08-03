/*
    Views, an application sub system, focus on View which is a react.component render with ReactDOM.
    use it to register, retrieve, remove, check Views.

    Views have two category, layers and modules.
    - Layers is a top react.component, which will render using ReactDOM.render.
    - Modules is a normal react.component, which will render by other react.component render function.

    author: jacky.chen
*/
import Container from "framework/patterns/base/container";

// Singleton class
export default class Views {
    constructor() {
        // declared member variable
        this._container = new Container();
    }

    // View register,
    register($name, $view) {
        return this._container.register($name, $view);
    }

    // View remove,
    remove($name) {
        return this._container.remove($name);
    }

    // View retrieve,
    retrieve($name) {
        return this._container.retrieve($name);
    }

    // View check,
    has($name) {
        return this._container.has($name);
    }

    // View execute action
    // This function is use at react-redux system.
    on(...$args) {
        // retrieve view object, first assign variable must be view name.
        if ($args.length > 0) {
            const name = $args[0];
            const param = $args.slice(1, $args.length);
            // retrieve object, if object have store, then dispatch action.
            const view = this.retrieve(name);
            if (view !== null && typeof view.store !== "undefined" && view.store !== null && typeof view.store.on === "function") {
                view.store.on(...param);
            }
        }
    }

    // update and draw all component in view
    // This function is use at react component.
    update($name = null) {
        // 1.check target view is all container or specify view in container.
        let targetView = this.container;
        if (this.has($name)) {
            targetView = [this.retrieve($name)];
        }

        // 2.update and draw target view
        for (const key in targetView) {
            if (Object.prototype.hasOwnProperty.call(targetView, key)) {
                const view = targetView[key];
                // check target view have "forceUpdate" function, it also mean this object is React.component.
                if (typeof view.forceUpdate === "function" && typeof view.deepForceUpdate === "function") {
                    view.deepForceUpdate();
                    // const obj = {_application_update_: new Date().getTime()};
                    // console.log(obj);
                }
            }
        }
    }
}
