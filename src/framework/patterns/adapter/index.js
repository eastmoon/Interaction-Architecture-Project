/*
Adapter pattern, ref : https://en.wikipedia.org/wiki/Adapter_pattern

Adapter is a object which translation three-party library to the same interface which framework defined.

author: jacky.chen
*/

import from ""
import Immutable from "./immutable";

export default class Adapter {
    static get Immutable() {
        return Immutable;
    }
}
