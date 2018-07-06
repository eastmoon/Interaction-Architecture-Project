/*
Command pattern, ref : https://en.wikipedia.org/wiki/Command_pattern
Simple command is a base command, which only defined execute method and command name setting.
When command constructor execute, but didn't pass new-name, this command name will the same with class name.

author: jacky.chen
*/

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
