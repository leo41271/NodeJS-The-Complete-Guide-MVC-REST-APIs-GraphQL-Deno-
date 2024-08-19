從 23 Payments `const app = express();`開始細看  
## app.js
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

## util/file.js
+ [node File System - unlink](https://nodejs.org/docs/latest/api/fs.html#fsunlinkpath-callback) fs.unlink(path, callback) 非同步 刪除指定路徑的檔案 ，callback 操作成功，物件將是 null

## routes/admin.js  
+ [express-validator](https://express-validator.github.io/docs) 基於 [Validator.js](https://github.com/validatorjs/validator.js)，提供了一組簡單而強大的工具，幫助開發者在處理用戶輸入時進行驗證和清理。
+ ★★★ [Guide express.Router](https://expressjs.com/en/guide/routing.html#express-router)<br>★★★ [手冊 express.Router](https://expressjs.com/zh-tw/guide/routing.html#express-router)
+ + [router.METHOD(path, [callback, ...] callback)](https://expressjs.com/en/5x/api.html#router.METHOD) <br>router.get 、 router.post 、 router.delete

## routes/auth.js  
+ [getting-started](https://express-validator.github.io/docs/guides/getting-started)  
1.一邊驗證 ， 2. 另一邊透過 validationResult(req) 處裡驗證 3. 最後(可選) 合乎匹配者 matchedData(req) 至少專案沒有;
+ [.check api](https://express-validator.github.io/docs/api/check/#check)
+ [.body api](https://express-validator.github.io/docs/api/check/#body) 跟上面比 這個只會檢查 body 其他依樣畫葫蘆
+ + [Customizing express-validator](https://express-validator.github.io/docs/guides/customizing)  
+ + [.custom api](https://express-validator.github.io/docs/api/validation-chain#custom)  
```js
router.post('/login',[
        body('email')
            .isEmail()
            .withMessage('Please enter a valid email address.')
            .normalizeEmail(),
        body('password', 'Password has to be valid.')
            .isLength({ min: 5 })
            .isAlphanumeric()
            .trim(),
    ], // 這裡 的 [ ... ] 驗證結果 會被儲存於 下方 authController.postLogin。 .postLogin 方法的 req 之中
    authController.postLogin
);
```
`authController.postLogin` 的部分。
```js
const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).render('auth/login', {
            path: '/login',
            pageTitle: 'Login',
            errorMessage: errors.array()[0].msg,
            oldInput: { email: email, password: password },
            validationErrors: errors.array(),
        });
    }
```

## middleware/is-auth.js
next() 一個重要的閘門機制讓流程繼續。  
[Guild - Writing middleware](https://expressjs.com/en/guide/writing-middleware.html)。[中文 撰寫中介軟體](https://expressjs.com/zh-tw/guide/writing-middleware.html)。  
`
Notice the call above to next(). Calling this function invokes the next middleware function in the app. The next() function is not a part of the Node.js or Express API, but is the third argument that is passed to the middleware function. The next() function could be named anything, but by convention it is always named “next”. To avoid confusion, always use this convention.
`
## controllers/shop.js<br>
Stripe 是一個全球領先的在線支付處理平台，專門為企業和開發者提供簡單而強大的支付解決方案。它讓各類型企業能夠輕鬆地接受和管理在線支付，包括信用卡、借記卡、銀行轉賬以及其他支付方式。Stripe 支持全球多個國家和地區的業務，並且提供了廣泛的 API 和工具，讓開發者能夠將支付功能集成到他們的網站、移動應用和其他線上平台中。
+ [stripe](https://docs.stripe.com/) (台灣 中國區 無法註冊)
+ + + 解決辦法[stripe 申請](https://www.youtube.com/results?search_query=stripe+%E7%94%B3%E8%AB%8B) (流程很多繁雜，尚未申請)
+ [pdfkit](https://pdfkit.org/) (pdfkit 在 20-6 Upload Download 中)

## controllers/auth.js<br>
+ node [crypto.randomBytes](https://nodejs.org/api/crypto.html#cryptorandombytessize-callback) 內建
+ [bcryptjs](https://github.com/dcodeIO/bcrypt.js)  
[compare(s, hash,...)](https://github.com/dcodeIO/bcrypt.js?tab=readme-ov-file#compares-hash-callback-progresscallback)、
[hash(s, salt,...)](https://github.com/dcodeIO/bcrypt.js?tab=readme-ov-file#hashs-salt-callback-progresscallback)<br><br>
+ [SendGrid Official](https://www.twilio.com/docs/sendgrid) (no use in project)  
+ [nodemailer example](https://nodemailer.com/#example)  
+ [nodemailer-sendgrid-transport](https://github.com/sendgrid/nodemailer-sendgrid-transport?tab=readme-ov-file) > [Documentation](https://github.com/sendgrid/nodemailer-sendgrid-transport/blob/master/USAGE.md)
```js
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const tranporter = nodemailer.createTransport(
    sendgridTransport({
        auth: {
            api_key: '<<YOUR_API_KEY>>',
        },
    })
);
// ...
return tranporter.sendMail({
                to: email,
                /** MUST MATCH VERIFIED SENDER
                 *  ============================
                 *  see "Sender Authentication" in
                 *  Sendgrid dashboard
                 */
                from: 'test@test.com',
                subject: 'Signup succeeded!',
                html: '<h1>You sucessfully signed up!</h1>',
            });
```
---
# 24 Rest Api

node - HTTP - [response.setHeader(name,value)](https://nodejs.org/api/http.html#responsesetheadername-value) (注意這裡的是node 核心模組的 方法 而不是 express.js 中的 static 中的選項 setHeaders )並且它會設定並更改(或新增)http的標頭資訊，且此時res還並未回傳回去它只是進行設定。  
MDN - [HTTP headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers) - [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) [中文看這](https://developer.mozilla.org/zh-TW/docs/Web/HTTP/CORS) 之下
+ [Access-Control-Allow-Origin](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin) 普遍而言 多以設定 * ，除非限定ex 某域(源)下才有的開通服務 好讓所有的該域下的client 都能取得指定域(也就是來源)的資料。 
+ [Access-Control-Allow-Methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Methods)
+ [Access-Control-Allow-Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Headers)

Youtube:  
[【跨域请求】【前端】什么是CORS ?](https://youtu.be/FF6zra7b7gM?si=HLvQN1TF5ku_Zfjl)  
[跨來源資源共用（Cross-Origin Resource Sharing, CORS）簡介](https://youtu.be/fcHDAciPPw0?t=215)影片中 3:35 對應到文檔的 [Origin 域](https://developer.mozilla.org/en-US/docs/Glossary/Origin) : the scheme (protocol), hostname (domain), and port.在同源(域)下三者必須完全匹配。  

next(); 前述有提到 ， 一個重要的閘門機制讓流程繼續。
並且是約定俗成命名 所以以下是可以的
```js
app.use((req, res, gg /* next */) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization'
    );
    gg(); // next();
});
// ---以下前端 拿取後端資料
postButton.addEventlistener('click', () => {
    fetch('http:///localhost:8089/feed/post'),{
        method: 'POST',
        body: JSON.stringify({
            title: 'A Codepen Post',
            content: 'Created via Codepen'
        }),
        headers: {
            'Content-Type': 'application/json'
        }
        // 在沒有JSON.stringify({... 。 
        // 預設下 Content-Type : text/plain
    }
})
```

## CORS Cross-Origin Resource Sharing 政策 剖析:  
為了安全問題，基本上瀏覽器會檢查 來源是否 相同，不同則需要額外設定。  
怎樣算相同? => scheme(protocol), hostname (domain), and port 三者必須完全一致。  
對應的舉例 (http https) (yahoo.com google.com) (localhost:80 localhost:3360)  

當來源不同 CORS 這個機制 會利用額外的 標頭headers + [預檢請求proflight request](https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request) 達成。  
在部分類別的請求中 約有兩類: 1.[簡單請求Simple requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#simple_requests) 2.預檢請求。  

簡單請求不會 讓CORS 觸發預檢檢查。在這種情況下 CORS 的規範會讓瀏覽器檢查 server 回傳 res 是否帶有允許(包含)我們這個網域的認證=> Access-Control-Allow-Origin: * (*表示所有的網域都包含)， 如果server 那邊在經過路由的相關判斷允許有回傳就沒問題 (從不同源發送所回傳的 res 值可能會不同 ， * 只是表示server 沒有特別規範設定 ) 。

如果非簡單請求， CORS 規範的流程會事先檢查 預檢請求 完成後 再看 主要請求。  
預檢請求 的方法是 options 並且多了 Access-Control-Allow-Methods 、 Access-Control-Allow-Headers 資訊。  
預檢請求的作用 是在向server 先告知 等等會有個非 簡單請求 先告訴你，你接受了我再傳給你。所以為什麼會在F12 中看到network 都會有兩個請求就是如此。  

其他特別設定 附帶身分驗證的請求  
如果請求當中帶有 cookie 或其他，裡面會帶有一些個人訊息 預設下在跨域請求時為了安全問題將不會帶著身分資訊，如果此時還想帶著 cookie之類的東西來瀏覽 需要額外設定 => [Access-Control-Allow-Credentials](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials) ， 且此時 Access-Control-Allow-Origin 將必須要是具體的， * 將會失敗。  

其他  
+ [Access-Control-Max-Age](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Max-Age) how long the results of a preflight request can be cached(被瀏覽器快取存多久).  
+ Access-Control-Expose-Headers : 客戶端可以去存到那些額外的標頭。

# 25 Rest Application

+ [default error handler](https://expressjs.com/en/guide/error-handling.html#the-default-error-handler) 必須要有4個 才能確實辨別出 錯誤處理程序。  
+ [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)  
[jwt.verify()](https://github.com/auth0/node-jsonwebtoken?tab=readme-ov-file#jwtverifytoken-secretorpublickey-options-callback)  
[jwt.sign()](https://github.com/auth0/node-jsonwebtoken?tab=readme-ov-file#jwtsignpayload-secretorprivatekey-options-callback)

auth.js
```js
exports.login = (req, res, next) => // ...登入
User.findOne({ email: email }) // ... DB 尋找特定帳號 並驗證 ...
return bcrypt.compare(password, user.password); // ... 比對驗證結果
.then((isEqual) =>  // ... 拿取驗證登入密碼結果後 在後續進行判別
// ...
const token = jwt.sign( // 授予 1hr token 簽章
    { email: loadedUser.email, userId: loadedUser._id.toString() },
    'somesupersecretsecret',
    { expiresIn: '1h' }
);
res.status(200).json({
    token: token,
    userId: loadedUser._id.toString(),
});
```
is-auth.js
```js
const jwt = require('jsonwebtoken');
// ...
const token = authHeader.split(' ')[1];
// [0] : >> 依照設定 ex : Basic Bearer Digest ...
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'somesupersecretsecret');
    } catch (err) {
        err.statusCode = 500;
        throw err;
    }
    if (!decodedToken) {
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        throw error;
    }
    req.userId = decodedToken.userId;
    next(); //最後確認 token 有過 繼續後續路由
```
參考 youtube jwtDoc: 
[JWT 驗證｜六角學院](https://youtu.be/0ZWo22vF4uU?si=jEEg0SWdV0dErduK)、[jwt.io](https://jwt.io/) [繁體中文](https://jwt.dev.org.tw/introduction)

```js
fetch('http://localhost:8080/auth/status', {
    headers: {
        Authorization: 'Bearer ' + this.props.token,
        // req.get('Authorization').split(" ")[0] : >> 依照設定 ex : Basic Bearer Digest ...
    },
})
```
HTTP headers - [Authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers#authentication) - [Authorization](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization)  
關於 為何約定俗成設定是=>> Bearer [Authentication schemes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#authentication_schemes)

---
+ markdown 的語法筆記  
markdown 的換行是兩個空白鍵 br標籤也可以。