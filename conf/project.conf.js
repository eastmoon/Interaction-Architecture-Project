// Library
import {argv} from "yargs";
// Development
import develop from "./develop/develop.startup";
// Non-Development, run test at onec.
import test from "./mocha/test.conf";

// 依輸入參數決定測試項目類型是否為開發模式
const type = argv.type ? argv.type : "demo";
const dev = argv.dev ? true : false;
const pattern = argv.pattern ? argv.pattern : "";
const INFO = {
    // 測試檔案根目錄
    ROOT: `test/${type}`,
    // 報表輸出目錄
    REPORT: `report/${type}`,
    //
    DEVELOP: "develop.startup.mocha.js"
};
console.log(`Project : ${type}, Develop : ${dev}, Pattern : ${pattern}`);

if (dev) {
    develop(INFO, pattern);
} else {
    test(INFO, pattern);
}
