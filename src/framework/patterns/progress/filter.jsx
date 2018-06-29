/*

*/

import Command from "utils/patterns/command/simple";
import RSVP from "rsvp";

export default class Filter extends Command {
    asyncExecute($progress = null) {
        return new RSVP.Promise((resolve, reject) => {
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
