/*
    Modles, an application sub system, focus on Model which is a data model, proxy, which is using at store application data and connection to remote web service.
    use it to register, retrieve, remove, check Models.

    author: jacky.chen
*/
import Container from "framework/patterns/base/container";

// Singleton class
export default class Models {
    constructor() {
        // declared member variable
        this._container = new Container();
    }

    // Model register,
    register($name, $model) {
        return this._container.register($name, $model);
    }

    // Model remove,
    remove($name) {
        return this._container.remove($name);
    }

    // Model retrieve,
    retrieve($name) {
        return this._container.retrieve($name);
    }

    // Model check,
    has($name) {
        return this._container.has($name);
    }
}
