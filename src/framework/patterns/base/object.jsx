/*
Object, a base object for all patterns class.

author: jacky.chen
*/

export default class BaseObject {
    // Constructor
    constructor($name) {
        // private variable, not safe way.
        this.name = $name ? $name : this.constructor.name;
    }
}
