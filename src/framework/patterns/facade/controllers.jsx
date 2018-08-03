/*
    Controlers, an application sub system, focus on Controller which is an application common command, when executing it will affect multiple view, model..
    use it to register, remove, check, execute controller.

    author: jacky.chen
*/
import Container from "framework/patterns/base/container";

// Singleton class
export default class Controllers {
    constructor() {
        // declared member variable
        this._container = new Container();
    }

    // Command register,
    register($name, $command) {
        return this._container.register($name, $command);
    }

    // Command remove,
    remove($name) {
        return this._container.remove($name);
    }

    // Command check,
    has($name) {
        return this._container.has($name);
    }

    // Command execute,
    execute($name, $param) {
        const cmd = this._container.retrieve($name);
        if (typeof cmd.execute !== "undefined" && cmd !== null) {
            cmd.execute($param);
        }
    }
}
