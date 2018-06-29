export default class SimpleCommand {
    // Constructor
    constructor($name) {
        // private variable, not safe way.
        this.name = $name ? $name : this.constructor.name;
    }

    // execute
    // Execute algorithm in this object.
    execute($args = null) {
        return $args;
    }
}
