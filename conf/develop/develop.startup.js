// Library : WebDriverIO
//
import {configureInquirer} from "./develop.startup.inquirer";
//
import {configureNodemon} from "./develop.startup.nodemon";

// 編譯模組輸出
module.exports = (config, pattern) => {
    // Config eslint rules.
    configureInquirer(config, pattern)
        .then((answer) => {
            // console.log(JSON.stringify(answer, null, '  '));
            // Config nodemon, watcher folder and checking file style.
            configureNodemon(config, answer.filename);
        });
}
