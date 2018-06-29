// Library
import nodemon from "nodemon";
import chalk from "chalk";

// default options for config.options
export function configureNodemon() {
    nodemon({
        restartable: "rs",
        verbose: true,
        exec: "eslint test/**/*.js",
        watch: ["test"],
        ext: "js json",
        env: {
          "NODE_ENV": "development"
        }
    });

    nodemon.on("start", function () {
        console.log(chalk.black.bgCyan("[NODEMON]") + " Application development model start.");
    }).on("quit", function () {
        console.log(chalk.black.bgRed("[NODEMON]") + " Application has quit.");
        process.exit();
    }).on("restart", function (file) {
        console.log(chalk.black.bgRed("[NODEMON]") + " Modify : ", file);
    });
}
