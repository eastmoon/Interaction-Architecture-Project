/*
Immutable library, ref : https://www.npmjs.com/package/immutable

Immutable.js is a library for make sure data object is immutable, and support data translation and data operation method.
But this library get/set value was not natural operation for javascript class/object.
Because of it, this class is an adapter for immutable.js for javascript class.

author: jacky.chen
*/
import BaseObject from "framework/patterns/base/object";
import Immutable from "immutable";

export default class ImmutableAdapter extends BaseObject {
    // Immutable adapter is a class with wrapper immutable class operation.
    constructor($name = null, $data = {}) {
        // 1. Call parent constructor
        super($name);
        // 2. Initial member variable and Get/Set property.
        this._immutable = null;
        this.set($data);
    }
    // Set method, it will set data into immutable object, and create get/set accessor with this object.
    // @param $data: The input will merge into current immutable, it could be JS object, Immutable object.
    // @return : The data which merge into current immutable, it is JS object.
    set($data) {
        // 1. Check input data, if data is immutable object, then translation to JS object.
        let input = $data;
        if ($data instanceof Immutable.Collection || $data instanceof Immutable.Seq) {
            input = $data.toJS();
        }
        // 2. Generate immutable dataSet by input data.
        if (this._immutable) {
            let temp = this._immutable.mergeDeep(input);
            this._immutable = temp;
        } else {
            this._immutable = Immutable.fromJS(input);
        }
        // 3. Register dynamice accessor.
        Object.keys(input).forEach((key) => {
            Object.defineProperty(this, key, {
                get() {return this._getProperty({
                  key: key,
                  immutable: this._immutable,
                  node: null
                })},
                set(value) {this._setProperty({
                  key: key,
                  value: value,
                  node: null
                })},
                configurable: true,
                enumerable: true
            });
        });
        return input;
    }
    // Get method, it will return current immutable object.
    get() {
        return this._immutable;
    }
    // Set Property method [private, prototected], all set accessor will call it to work.
    // In this method, value is object will using Immutable to translation first.
    // And the node exist, it mean data need to saving in nested structures.
    // NOTE: Set value will work with root immutable object, because return object will become a new root.
    _setProperty($args) {
        const {key, value, node} = $args;
        //console.log("Set", $node, $key, $value);
        // 1. Check value type, if value is object, using Immutable to translation.
        let result = null;
        if (typeof value === "object") {
            result = Immutable.fromJS(value);
        } else {
            result = value;
        }
        // 2. If result exist, set in.
        if (result !== null) {
            if(node) {
                this._immutable = this._immutable.setIn(node.concat(key), result);
            } else {
                this._immutable = this._immutable.set(key, result);
            }
        }
    }
    // Get Property method [private, prototected], all get accessor will call it to work.
    // In this method, if return result is Immutable object, it will using other adapter to wrapper with.
    // NOTE: Get value will work with assign immutable object, it almost like recursive function delegate into different adapter.
    _getProperty($args) {
        const {key, immutable, node} = $args;
        //console.log("Get", this);
        //console.log("Get", $node, $key, $immutable);
        let result = immutable.get(key);
        let path = node ? node.concat(key) : [key];
        if (result instanceof Immutable.Map) {
            result = new MapAdapter(result, path, this._getProperty.bind(this), this._setProperty.bind(this));
        }
        if (result instanceof Immutable.List) {
            result = new ListAdapter(result, path, this._getProperty.bind(this), this._setProperty.bind(this));
        }
        return result;
    }
}

export class MapAdapter {
    // Map adapter is a class with wrapper Immutable.map class get/set operation.
    // In this class, get/set accessor will execute a function come from ImmutableAdapter.
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
                    get() {return $get({
                      key: key,
                      immutable: this._immutable,
                      node: this._node
                    })},
                    set(value) {$set({
                      key: key,
                      value: value,
                      node: this._node
                    })},
                    configurable: true,
                    enumerable: true
                });
            }
        } while(!item.done)
    }
    // Get method, it will return current immutable object.
    get() {
        return this._immutable;
    }
}

export class ListAdapter {
    // List adapter is a class with wrapper Immutable.list class get/set operation.
    // In this class, get/set accessor will execute a function come from ImmutableAdapter, and also get/set data with array symbol [...].
    constructor($list, $node, $get, $set) {
        // 1. Save immutable object, and method
        this._immutable = $list;
        this._node = $node;
        // 2. Register dynamice accessor.
        this._immutable.forEach((val, index) => {
            let key = index;
            Object.defineProperty(this, key, {
                get() {return $get({
                  key: key,
                  immutable: this._immutable,
                  node: this._node
                })},
                set(value) {$set({
                  key: key,
                  value: value,
                  node: this._node
                })},
                configurable: true,
                enumerable: true
            });
        })
    }
    // Get method, it will return current immutable object.
    get() {
        return this._immutable;
    }
}
