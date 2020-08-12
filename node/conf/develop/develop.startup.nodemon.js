// Library
import nodemon from "nodemon";
import chalk from "chalk";
import path from "path";

// default options for config.options
export function configureNodemon(config, filename) {
    //
    const rootPath = config.ROOT ? config.ROOT : "test";
    const reportPath = config.REPORT ? config.REPORT : "report";
    const execFile = config.DEVELOP ? config.DEVELOP : "";
    if (execFile === "") {
        return false;
    }
    nodemon({
        restartable: "rs",
        verbose: true,
        exec: `babel-node ${path.resolve(__dirname, execFile)} --file=${filename} --report=${reportPath}`,
        watch: [rootPath],
        ext: "js",
        env: {
          "NODE_ENV": "development"
        }
    });
    //
    nodemon.on("start", function () {
        console.log(chalk.black.bgCyan("[NODEMON]") + ` Development model : re-test for ${filename}`);
    }).on("quit", function () {
        console.log(chalk.black.bgRed("[NODEMON]") + " Development has quit.");
        process.exit();
    }).on("restart", function (file) {
        console.log(chalk.black.bgRed("[NODEMON]") + " Modify : ", file);
    });
}
