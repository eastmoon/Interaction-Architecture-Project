# WebDriverIO project

## § Library

此專案使用函式庫：

專案主要框架
* [Mocha](https://mochajs.org/)

## § Install project

### 1、Install nvm

+ [for Linux / Mac](https://github.com/creationix/nvm)
+ [for Windows](https://github.com/coreybutler/nvm-windows/releases)

```
nvm version
```
> 執行此命令確保 nvm 安裝成功

### 2、node

利用 nvm 安裝 node、npm 兩個主要工具

```
// 安裝
nvm install <version>
// 執行
nvm use <version>
```
> 注意，在 windows 環境下 npm 套件可能因為路敬字串過長而安裝失敗，需將 nvm 重新安裝到不同位置，或更改環境路徑。

### 3、yarn

```
npm install -g yarn
```
> 透過此方式取得最新版本的 yarn 管理套件，若 npm 執行異常可改用此套件管理工具。

___

### 4、install project library

```
npm install
```
> 若使用 yarn 套件則使用 ```yarn install```。
>
> 此命令請於專案夾內執行。

## § Project command

### 測試模式
```
yarn test
```
> --type=[e2e, contract], 執行該類別下的測試項目；預設為 demo
>
> --pattern=<folder name>, 執行該類別下特定檔案路徑 (folder name) 內的測試項目

測試模式會執行對應類別下的所有測試項目。

### 開發模式
```
yarn start
```
> --type=[e2e, contract], 執行該類別下的所有測試項目；預設為 demo
>
> --pattern=<folder name>, 執行該類別下特定檔案路徑 (folder name) 內的測試項目

開發模式會先選擇單一項目，並監視該類別檔案夾，一旦有更動，重新測試此項目。

### ESlint 語法檢查
```
yarn eslint
```

依據文檔設定的 eslint 規範，檢查 test 下所有的測試程式是否符合規範。
