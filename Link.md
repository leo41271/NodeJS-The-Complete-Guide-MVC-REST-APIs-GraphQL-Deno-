從 23 Payments `const app = express();`開始細看 (app.js)。
+ [express.js Eng](https://expressjs.com/)
+ [express.js zh-tw 繁體](https://expressjs.com/zh-tw/)
+ [express.js cn 簡體](https://www.expressjs.com.cn/)
+ + [app.use (5x)](https://expressjs.com/en/5x/api.html#app.use)(掛載指定的中間件 middleware 函數)
+ + [app.set (5x)](https://expressjs.com/en/5x/api.html#app.use)(Properties in the table 點入後往下查找表格 (views、view engine))
+ + [app.get (5x)](https://expressjs.com/en/5x/api.html#app.get.method)(app.get('/500', errorController.get500);)
+ + [express.static (5x)](https://expressjs.com/en/5x/api.html#express.static)(靜態檔案(static files)。靜態檔案通常指不需要伺服器端動態產生的資源，如 HTML 檔案、圖片、CSS 檔案、JS 檔案等。透過 express.static 中間件，你可以非常方便地將這些靜態資源提供給客戶端。)
+ + + [nodejs path.join](https://nodejs.org/api/path.html#pathjoinpaths)  
stackoverflow [What is the difference between __dirname and ./ in node.js?](https://stackoverflow.com/a/18283508/11493041)  
[__dirname](https://nodejs.org/docs/latest/api/globals.html#__dirname) in nodejs not global! >> [__dirname doc](https://nodejs.org/api/modules.html#modules_dirname)(請看 stackoverflow 以看出實際差異)

body-parser 是一個 Node.js 中間件，用於解析請求中的 body 資料  
+ [git body-parser](https://github.com/expressjs/body-parser)(API doc 都在這)
+ + [bodyParser Examples](https://github.com/expressjs/body-parser?tab=readme-ov-file#examples)
+ + [urlencoded](https://github.com/expressjs/body-parser?tab=readme-ov-file#bodyparserurlencodedoptions)
(是一種編碼資料格式，常用在 HTTP 請求中傳遞表單資料。當表單使用 `application/x-www-form-urlencoded` 編碼類型提交時，表單中的資料會被編碼成鍵值對形式，然後附加到請求的 URL 或作為請求的 `body` 傳遞。 extended : false  時 Express 使用 Node.js 內建的 querystring 模組來解析 urlencoded 資料 只能解析簡單的鍵值; true 時 使用 qs（Query String）庫，嵌套(多層)物件或陣列 都可解析) 。
+ + 在 Express 4.x 及更高版本中，body-parser 已經被整合到 Express 本身，因此你可以直接使用 express.json() 和 express.urlencoded() 來取代 body-parser 的功能 (5x基本都有了)

Multer 是一個 Node.js 中間件，專門用來處理 multipart/form-data，這是用於上傳檔案的主要表單編碼類型，主要用於上傳文件檔案。是常見且強大的解決方案。
+ [git Multer](https://github.com/expressjs/multer)。[簡體中文 Multer](https://github.com/expressjs/multer/blob/master/doc/README-zh-cn.md) 從 Usage 開始看。
Multer 會新增 (body + (file or files) )物件 到 express 的 request物件中。body: 表單訊息 、 (file or files):上傳相關訊息。
+ + [DiskStorage](https://github.com/expressjs/multer?tab=readme-ov-file#diskstorage)(整篇文檔寫得很清晰 (需要幾乎整個doc都要看掉)。 file extension 指的就是檔案的附檔名)

express-session 是在 Express 應用中管理使用者會話(session)的中間件。允許在伺服器端儲存使用者的data並在不同的請求之間保持狀態。對需要保持使用者登入狀態、處理使用者偏好設定或跨請求保存臨時數據的情況來說特別有用。
+ [express-session](https://github.com/expressjs/session)
+ + [secret](https://github.com/expressjs/session?tab=readme-ov-file#secret)(必填 用來簽名 session ID 的密鑰)
+ + [resave](https://github.com/expressjs/session?tab=readme-ov-file#resave)(Typically, you'll want false 讓他在有變更後才儲存)
+ + [saveuninitialized](https://github.com/expressjs/session?tab=readme-ov-file#saveuninitialized)( 跟上面一樣 不過是在初始化階段)
+ + [store](https://github.com/expressjs/session?tab=readme-ov-file#store)(儲存點、存到哪)>>以下相容的相關套件  
[![★][connect-mongodb-session-image] connect-mongodb-session][connect-mongodb-session-url] Lightweight MongoDB-based session store built and maintained by MongoDB. (另一個很相似 ★也較多的是 connect-mongo 但課程沒有用。 [Connection String](https://www.mongodb.com/docs/manual/reference/connection-string/#find-your-connection-string) 用於連接到 mongoDB Atlas 的官網doc)

[connect-mongodb-session-url]: https://github.com/mongodb-js/connect-mongodb-session
[connect-mongodb-session-image]: https://badgen.net/github/stars/mongodb-js/connect-mongodb-session?label=%E2%98%85

connect-flash 是一個用於 Express 應用中的中介軟體，允許你在使用者導向的訊息(如錯誤、警告、成功訊息等)之間傳遞資料，通常用於在重導頁面後顯示一次性訊息。
+ [connect-flash](https://github.com/jaredhanson/connect-flash)  
(With the flash middleware in place, all requests will have a req.flash() function that can be used for flash messages.)

cookie-parser 是一個用於 Express 應用中的中介軟體，用來解析 HTTP 請求中的 cookies 並使其可供你的應用程式使用。Cookies 是瀏覽器用來儲存資料的小型文字檔案，通常用於儲存使用者偏好設定、會話資訊或追蹤使用者活動等。
+ [cookie-parser](https://github.com/expressjs/cookie-parser)
(解析 Cookie 標頭並使用以 cookie 名稱為鍵的物件填入 req.cookies。)
+ + [res.cookie(name, value [, options])](https://expressjs.com/en/5x/api.html#res.cookie) 設定cookies內容

csrf  
youtube : [CSRF 攻击和防御 - Web 安全常识](https://youtu.be/gEPii2y3ISQ?si=j_gvxTJKMFUFmyDh) good source。  
前面 [15-06-adding-csrf](https://github.com/leo41271/node.js-complete-guide-2024-use-commit/commit/13ee5919c70a17a513611ceacf9ef6741a5c383f#comments) 這個篇章時 作者使用 [csurf](https://www.npmjs.com/package/csurf#example) `"csurf": "^1.11.0",` 已經被棄用，這裡改用 csrf-csrf 。
+ [csrf-csrf](https://github.com/Psifi-Solutions/csrf-csrf) 是透過[Double Submit Cookie Pattern.](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html#alternative-using-a-double-submit-cookie-pattern) 方式實現 csrf 保護的，是 stateless無狀態 pattern。  
Dos and Don'ts (表示使用準的的縮寫: 可作 與 不要作)
其中的[配置 Configuration](https://github.com/Psifi-Solutions/csrf-csrf?tab=readme-ov-file#configuration)
```js
// 基本定義解構出來的屬性 
const {
    invalidCsrfTokenError, // This is just for convenience if you plan on making your own middleware.
  generateToken, // Use this in your routes to provide a CSRF hash + token cookie and token.
  validateRequest, // Also a convenience if you plan on making your own middleware.
  doubleCsrfProtection, // This is the default CSRF protection middleware.
} = doubleCsrf(doubleCsrfOptions);
    // 所以我們會看到 app.use(csrfProtection.doubleCsrfProtection); 但前面定義卻沒有。
```
Mongoose 是一個基於 Node.js 的 MongoDB 物件數據模型 (Object Data Modeling, ODM) 庫，它提供了一個在 Node.js 應用中對 MongoDB 進行操作的簡單而強大的方式。Mongoose 讓開發者可以用類似 SQL 的方式去定義和操作 MongoDB 的文檔數據模型，並且提供了豐富的功能來幫助處理數據的驗證、查詢、關聯等。
+ [mongoose homepage](https://mongoosejs.com/)
+ [git mongoose](https://github.com/Automattic/mongoose)
+ + [Support 問問題相關的支援](https://github.com/Automattic/mongoose?tab=readme-ov-file#support)  
+ [mongoosejs quick start](https://mongoosejs.com/docs/index.html) :  
1.With Mongoose, everything is derived from a [Schema](https://mongoosejs.com/docs/guide.html).  
1.5 Functions added to the `methods` property of a schema.  
2.compiling schema into a [Model](https://mongoosejs.com/docs/models.html).  
3.document can be saved to the database by calling its [save](https://mongoosejs.com/docs/api/model.html#Model.prototype.save()) method.  
4.[querying](https://mongoosejs.com/docs/queries.html) syntax filter the data we want

routes/admin.js  
+ [express-validator](https://express-validator.github.io/docs) 基於 [Validator.js](https://github.com/validatorjs/validator.js)，提供了一組簡單而強大的工具，幫助開發者在處理用戶輸入時進行驗證和清理。
+ ★★★ [Guide express.Router](https://expressjs.com/en/guide/routing.html#express-router)<br>★★★ [手冊 express.Router](https://expressjs.com/zh-tw/guide/routing.html#express-router)
+ + [router.METHOD(path, [callback, ...] callback)](https://expressjs.com/en/5x/api.html#router.METHOD) <br>router.get 、 router.post 、 router.delete

controllers/shop.js<br>
Stripe 是一個全球領先的在線支付處理平台，專門為企業和開發者提供簡單而強大的支付解決方案。它讓各類型企業能夠輕鬆地接受和管理在線支付，包括信用卡、借記卡、銀行轉賬以及其他支付方式。Stripe 支持全球多個國家和地區的業務，並且提供了廣泛的 API 和工具，讓開發者能夠將支付功能集成到他們的網站、移動應用和其他線上平台中。
+ [stripe](https://docs.stripe.com/) (台灣 中國區 無法註冊)
+ + + 解決辦法[stripe 申請](https://www.youtube.com/results?search_query=stripe+%E7%94%B3%E8%AB%8B) (流程很多繁雜，尚未申請)
+ [pdfkit](https://pdfkit.org/) (pdfkit 在 20-6 Upload Download 中)
---
+ markdown 的語法筆記  
markdown 的換行是兩個空白鍵 br標籤也可以。