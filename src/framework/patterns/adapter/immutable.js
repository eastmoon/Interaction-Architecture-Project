/*
Immutable library, ref : https://www.npmjs.com/package/immutable

Immutable.js is a library for make sure data object is immutable, and support data translation and data operation method.
But this library get/set value was not natural operation for javascript class/object.
Because of it, this class is an adaptor for immutable.js for javascript class.

author: jacky.chen
*/
import BaseObject from "framework/patterns/base/object";
import Immutable from "immutable";

export default class ImmutableAdaptor extends BaseObject {
    constructor($name = null, $data = {}, $immutable = null) {
        //
        super($name);
        //
        this._immutable = $immutable;
        this.setState($data);
        //

    }
    setState($data) {
        // 1. Generate immutable dataSet by input data.
        if (this._immutable) {
            let temp = this._immutable.mergeDeep($data);
            this._immutable = temp;
        } else {
            this._immutable = Immutable.fromJS($data);
        }
        // 2. Register dynamice accessor.
        Object.keys($data).forEach((key) => {
            Object.defineProperty(this, key, {
                get() {return this._getProperty(key, this._immutable)},
                set(value) {this._setProperty(key, value)},
                configurable: true,
                enumerable: true
            });
        });
    }
    getState() {
        return this._immutable;
    }
    _setProperty($key, $value, $node = null) {
        //console.log("Set", $node, $key, $value);
        // 1. Check value type, if value is object, using Immutable to translation.
        let result = null;
        if (typeof $value === "object") {
            result = Immutable.fromJS($value);
        } else {
            result = $value
        }
        // 2. If result exist, set in.
        if (result) {
            if($node) {
                this._immutable = this._immutable.setIn($node.concat($key), result);
            } else {
                this._immutable = this._immutable.set($key, result);
            }
        }
    }
    _getProperty($key, $immutable, $node = null) {
        //console.log("Get", this);
        //console.log("Get", $node, $key, $immutable);
        let result = $immutable.get($key);
        let node = $node ? $node.concat($key) : [$key];
        if (result instanceof Immutable.Map) {
            result = new MapAdapter(result, node, this._getProperty.bind(this), this._setProperty.bind(this));
        }
        if (result instanceof Immutable.List) {
            result = new ListAdapter(result, node, this._getProperty.bind(this), this._setProperty.bind(this));
        }
        return result;
    }
}

export class MapAdapter {
    constructor($map, $node, $get, $set) {
        // 1. Save immutable object, and method
        this._immutable = $map;
        this._node = $node;
        // 2. Register dynamice accessor.
        const iterator = this._immutable.keys();
        let item = null;
        do {
            item = iterator.next();
            if (!item.done) {
                let key = item.value;
                Object.defineProperty(this, key, {
                    get() {return $get(key, this._immutable, this._node)},
                    set(value) {$set(key, value, this._node)},
                    configurable: true,
                    enumerable: true
                });
            }
        } while(!item.done)
    }
    getState() {
        return this._immutable;
    }
}

export class ListAdapter {
    constructor($list, $node, $get, $set) {
        // 1. Save immutable object, and method
        this._immutable = $list;
        this._node = $node;
        // 2. Register dynamice accessor.
        this._immutable.forEach((val, index) => {
            let key = index;
            Object.defineProperty(this, key, {
                get() {return $get(key, this._immutable, this._node)},
                set(value) {$set(key, value, this._node)},
                configurable: true,
                enumerable: true
            });
        })
    }
    getState() {
        return this._immutable;
    }
}
