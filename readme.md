# Interactive architecture project

+ Research document
  - [Architecture pattern](https://github.com/eastmoon/research-software-theory/blob/master/software-engineering/architecture_pattern.md)
  - [Interactive architecture](https://github.com/eastmoon/research-software-theory/blob/master/software-engineering/interactive_architecture.md)

此專案是以樣式設計實踐互動架構概念，其設計主要思想來自於 PureMVC。

This project is using design pattern to implement interaction architecture concept, which design idea come from PureMVC.

依據 [Pattern-Oriented Software Architecture](https://www.amazon.com/Pattern-Oriented-Software-Architecture-System-Patterns/dp/0471958697) 定義，互動架構 (Interaction architecture) 包括 Model-View-Controller、Presentation–abstraction–control，而軟體的演變，其中亦延伸如 Document-View、Model–View–Presenter、Model-View-ViewModel 等架構概念。

In the book "[Pattern-Oriented Software Architecture](https://www.amazon.com/Pattern-Oriented-Software-Architecture-System-Patterns/dp/0471958697)", Interaction architecture include two famous architecture "Model-View-Controller", "Presentation–abstraction–control". And now, interaction architecture has difference extension,  like "Document-View", "Model–View–Presenter", "Model-View-ViewModel".

而其主要變革，多集中於 View 的概念與細節，然而其改變卻往往依據應用情境而限縮了結構靈活度；因此本專案將針對控制、資料面進行細部規劃。

But, the major change is on "View", and those change also limit the using situation, and the structure flexibility. So, in this project will focus on "Controller", "Model" design detail.

## § Introduction

架構是一種概念，對此以 Design Pattern 實踐 MVC 的軟體設計方式，則每個模組針對其功能定位，會需使用不同樣式來設計；但必須注意，實際運用於不同的框架會保留的樣式會有不同，例如 React 具備 View Component 與 Reactive 框架，則無需重複設計相同樣式，而是思考現有框架的樣式完成度並以此來思考其他樣式的開發與補充。

+ [Model-View-Controller application](doc/design-description.md#model-view-controller-application)

實踐框架的應用程式入口，依循 PureMVC 概念，透過唯一化的應用程式入口，讓系統藉此完成對 MVC 框架的操作。

+ [Model](doc/design-description.md#model)

模組 ( Model ) 的主要設計是儲存資料與資料轉換，因此相關的 Design Pattern 皆會著重如何實踐與規劃。

+ [View](doc/design-description.md#View)

視圖 ( View ) 的主要設計是資料呈現、動態頁面構築、互動操作等，因此相關 Design Pattern 會著重於如何有效的撰寫互動與規劃元件。

+ [Controller](doc/design-description.md#controller)

控制器 ( Controller ) 的主要設計是應用程式操作，因此相關 Design Pattern 會著重於如何有效組件操作命令。

## § Library

此專案使用函式庫：

專案環境
* [Node.js](https://nodejs.org/en/)
* [Yarn for package management](https://yarnpkg.com/lang/en/)

專案語言規範：
* [ECMAScript 6.0 / Babel](https://babeljs.io/learn-es2015/)

專案主要框架
* [Mocha](https://mochajs.org/)

## § Install and Start enviroment

本專案使用 Docker 建立開發環境，並掛入外部快取硬碟作為第三方函式庫緩存區，啟用開發環境則可透過 ```dockerw.bat``` 的應用介面來啟動
> dockerw 採用 [Command Line Interface](https://github.com/eastmoon/command-line-interface-application) 應用作為介面

```
dockerw start
```
> 啟動程序會依序建立環境映像檔、下載 node 函式庫、並進入開發環境。

## § Project command

### 測試模式
```
yarn test
```

| 參數名稱 | 參數值 (預設) | 說明 |
| :-: | :-: | :-- |
| ```--project``` | folder_name (demo) | 執行該類別下的測試項目 |
| ```--pattern``` | folder_name / file_name | 執行該類別下特定檔案路徑 (folder name) 內的測試項目或特定檔案 (file name) 內的測試項目 |

測試模式會執行對應類別下的所有測試項目。

### 開發模式
```
yarn start
```

| 參數名稱 | 參數值 (預設) | 說明 |
| :-: | :-: | :-- |
| ```--project``` | folder_name (demo) | 執行該類別下的測試項目 |
| ```--pattern``` | folder_name / file_name | 檔案選擇預設鎖定於特定檔案路徑 (folder name) 或檔案 (file name) 名稱的測試項目 |

開發模式會先選擇單一項目，並監視該類別檔案夾，一旦有更動，重新測試此項目。

### ESlint 語法檢查
```
yarn eslint
```

依據文檔設定的 eslint 規範，檢查 test 下所有的測試程式是否符合規範。
