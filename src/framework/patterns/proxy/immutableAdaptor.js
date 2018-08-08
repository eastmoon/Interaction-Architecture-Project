/*
Immutable library, ref : https://www.npmjs.com/package/immutable

Immutable.js is a library for make sure data object is immutable, and support data translation and data operation method.
But this library get/set value was not natural operation for javascript class/object.
Because of it, this class is an adaptor for immutable.js for javascript class.

author: jacky.chen
*/
import BaseObject from "framework/patterns/base/object";
import Immutable from "immutable";

class ImmutableAdaptor extends BaseObject {
    constructor($name = null) {
        //
        super($name);
        //
        this._immutable = null;
        this.setState({});
        //

    }
    setState($data) {
        // 1. Generate immutable dataSet by input data.
        if (this._immutable) {
            let temp = this._immutable.mergeDeep($data);
            console.log(temp === this._immutable);
            this._immutable = temp;
        } else {
            this._immutable = Immutable.fromJS($data);
        }

        // 2. Register dynamice accessor.
        Object.keys(this._dataSet).forEach((key) => {
            Object.defineProperty(this, key, {
                get() {return this._getProperty(key)},
                set(value) {this._setProperty(value)},
                configurable: true,
                enumerable: true
            });
        });
    }
    _setProperty(value) {
        this._immutable.set(value);
    }
    _getProperty(key) {
        return this._immutable.get(key)
    }
}
