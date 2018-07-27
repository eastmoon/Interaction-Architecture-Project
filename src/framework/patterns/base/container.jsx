/*
    Container, a class type limit key-value storage, which have 4 operated "register", "remove", "retrieve", "has".

    author: jacky.chen
*/
/*
class type name retrieve and check
- Class name : Class.name
- Object class name : obj.constructor.name
- Object type check : [objact] instanceof [class]
Ref : http://stackoverflow.com/questions/1249531
*/
import BaseObject from "framework/patterns/base/object";

// Singleton class
export default class Container extends BaseObject{
    /*
     * Constructor
     * @Parma name, if first variable is string, than it mean container name, else will using default container name.
     * @Parma ...class-type, if param is a function type and have constructor, than it is a type which could register in this container. If limit type didn't setting, than any type could register in this container.
     */
    constructor(...$args) {
        // Parser parame
        let name = null;
        let limit = $args;
        if ($args.length > 0 && typeof $args[0] === "string") {
            name = $args[0];
            limit = $args.slice(1);
        }
        // add name for container
        super(name);
        // declared member variable
        this._limitType = [];
        this._storage = {};
        // add limit type by $args
        limit.forEach((item) => {
            if (typeof item === "function" && typeof item.constructor === "function") {
                this._limitType.push(item);
            }
        });
    }

    // private method : args parser
    _argsParser(...$args) {
        const argv = {
            object: null,
            name: null
        }
        // 1. Assign : [Object]
        // It mean only pass object in, and object name is class attribute, or class name.
        if ($args.length === 1 && typeof $args[0] === "object") {
            argv.object = $args[0];
            argv.name = (argv.object.name) ? argv.object.name : argv.object.constructor.name;
        }
        // 1. Assign : [String]
        // It mean only pass object name in.
        if ($args.length === 1 && typeof $args[0] === "string") {
            argv.object = null;
            argv.name = $args[0];
        }
        // 2. Assign : [String, Object]
        // String is argv.name, Object is argv.object
        if($args.length === 2 && typeof $args[0] === "string" && typeof $args[1] === "object") {
            argv.name = $args[0];
            argv.object = $args[1];
        }
        return argv;
    }

    // Model register.
    // override : object
    // override : name, object
    register(...$args) {
        // 0. parser args
        const argv = this._argsParser(...$args);
        // 1. Make sure object is the class, which this container need.
        // And, if limitType is empty, it mean no-class type limit.
        let isDefinedType = false;
        if (this._limitType.length) {
            this._limitType.forEach((type) => {
                isDefinedType = argv.object instanceof type;
            });
        } else {
            isDefinedType = true;
        }
        // 3. check model is duplicate or not
        if (isDefinedType && argv.object !== null && (typeof this._storage[argv.name] === "undefined" || this._storage[argv.name] === null)){
            // 3.1. saving non-duplicate model.
            this._storage[argv.name] = argv.object;
        } else {
            // 3.2. throw error message for duplicate register.
            return false;
        }
        return true;
    }

    // Model remove,
    remove(...$args) {
        // 0. parser args
        const argv = this._argsParser(...$args);
        // 1. retrieve model, if exist, remove it.
        const obj = this.retrieve(argv.name);
        if (obj !== null) {
            // remove target object in mapping.
            // this._storage[$name] = null;
            delete this._storage[argv.name];
        }
        // return target object.
        return obj;
    }

    // Model retrieve,
    retrieve(...$args) {
        // 0. parser args
        const argv = this._argsParser(...$args);
        // using mapping to check, if exist return object, then return null
        if (this.has(argv.name)) {
            return this._storage[argv.name];
        }
        return null;
    }

    // Model check,
    has(...$args) {
        // 0. parser args
        const argv = this._argsParser(...$args);
        // retireve object, if null then dosn't exist.
        if (typeof this._storage[argv.name] === "undefined" || this._storage[argv.name] === null) {
            return false;
        }
        return true;
    }

    // Accessor
    get storage() {
        return this._storage;
    }
    get count() {
        return Object.keys(this._storage).length;
    }
}
