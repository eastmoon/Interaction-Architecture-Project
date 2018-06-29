// Library, ref : https://www.npmjs.com/package/inquirer
import inquirer from "inquirer";
import chalk from "chalk";
import glob from "glob";

// Question demo : https://github.com/SBoudrias/Inquirer.js/tree/master/examples
// Autocomplete Question : https://github.com/mokkabonna/inquirer-autocomplete-prompt

// register inquirer prompt
inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));

// Defined question.
const inputfilename = {
    type: "autocomplete",
    name: "filename",
    message: chalk.blue.bold("Input filename :"),
    source: searchFolder
};
var rootPath = "test";
var defaultInput = null;

// search folder algorithm.
function searchFolder(answers, input) {
    // input could not be undefined
    if (defaultInput) {
        input = defaultInput;
        defaultInput = null;
    } else {
        input = input || '';
    }
    // search folder algorithm
    return new Promise((resolve) => {
        glob(`${rootPath}/**/{*${input}*/*.js,*${input}*.js}`, {}, (err, matches) => {
            if (!err) {
                resolve(matches);
            }
            resolve([]);
        });
    });
}

// Execute question
export function configureInquirer(config, pattern) {
    rootPath = config.ROOT ? config.ROOT : "test";
    if (pattern) {
        defaultInput = pattern
    }
    return inquirer
      .prompt([inputfilename])
}
