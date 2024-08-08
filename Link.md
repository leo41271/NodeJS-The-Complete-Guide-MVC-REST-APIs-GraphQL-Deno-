從 23 Payments `const app = express();`開始細看。
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
---
+ markdown 的語法筆記  
markdown 的換行是兩個空白鍵