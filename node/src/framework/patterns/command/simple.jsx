/*
Command pattern, ref : https://en.wikipedia.org/wiki/Command_pattern
Simple command is a base command, which only defined execute method and command name setting.
When command constructor execute, but didn't pass new-name, this command name will the same with class name.

author: jacky.chen
*/
import BaseObject from "framework/patterns/base/object";

export default class SimpleCommand extends BaseObject {
    // Constructor
    constructor($name) {
        super($name);
    }

    // execute
    // Execute algorithm in this object.
    execute($args = null) {
        return $args;
    }
}
