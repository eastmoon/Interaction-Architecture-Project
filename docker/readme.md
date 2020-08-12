## Package reference

### NVM

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
