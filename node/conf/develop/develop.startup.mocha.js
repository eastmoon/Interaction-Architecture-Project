// Library
import {argv} from "yargs";
// Library, mocha
// ref : https://github.com/mochajs/mocha/wiki/Using-mocha-programmatically
import Mocha from "mocha";
import MochaConf from "../mocha/mocha.conf";
// Execute question
export function luncherTestCase(file) {
    // Instantiate a Mocha instance.
    var mocha = new Mocha(MochaConf);
    // Add test file
    mocha.addFile(file);
    // Lanucher Macho
    mocha.run(function(failures){
        process.on('exit', function () {
            process.exit(failures);  // exit with non-zero status if there were failures
        });
    });
}
luncherTestCase(argv.file);
