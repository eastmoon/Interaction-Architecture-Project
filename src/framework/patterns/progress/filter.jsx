/*
Progress pattern:
In interaction system, when command execution, user interface and data model will step by step running. Mostly, step is asynchronous and complex, like scenes animate or scenes loading.
Basically, Progress is inherit Command, the difference with Command is asynchronous execution.

author: jacky.chen
*/

import Command from "framework/patterns/command/simple";

export default class Filter extends Command {
    asyncExecute($progress = null) {
        return new Promise((resolve, reject) => {
            this.execute($progress, resolve, reject);
        }).catch((error) => {
            this.fail(error);
            throw error;
        });
    }
    execute($progress = null, $resolve = null, $reject = null) {
        console.log("[Filter] execute", $progress, $resolve, $reject);
        return $progress;
    }
    fail($error = null) {
        console.error("[Filter] error", $error);
    }
}
