const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById('635a9e6a9bc7ce61c0b80a1d')
        .then((user) => {
            req.user = new User(user.name, user.email, user.cart, user._id);
            next();
        })
        .catch((err) => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(() => {
    app.listen(3000);
});
// mongoConnect(
// () => { app.listen(3000); } 先連線成功後 接下來這段才會。 箭頭函式
// );
// mongoConnect( app.listen(3000) ); ?? 因為這樣寫會立即執行 app.listen(3000)
// 回呼函式的正確用法: 需要傳遞一個函式（而不是函式的返回值）給 mongoConnect。
// mongoDB DOC https://www.mongodb.com/docs/manual/ 