const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findByPk(1)
        .then((user) => {
            req.user = user;
            next();
        })
        .catch((err) => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' }); // onDelete: 'CASCADE' : 當 User 中的一條記錄被刪除時，所有與之關聯的 Product 記錄也會被自動刪除
User.hasMany(Product);
User.hasOne(Cart); // 一對一的關聯。User 是主模型，Cart 是從模型
Cart.belongsTo(User); // Cart 屬於 User ， 資料庫中，這會在 Cart 表中添加一個外鍵來指向 User 表的主鍵 (每個用戶都可以擁有一個購物車)
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem }); // CartItem 是用來儲存這種多對多關聯( Cart Product )的中間表
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

sequelize
    /** -- WORKAROUND FOR FOREIGN KEY ERROR -- */
    // .query('SET FOREIGN_KEY_CHECKS = 0', { raw: true })
    // .then(() => sequelize.sync({ force: true }))
    // force: true 使用場景開發階段: 在開發過程中經常修改模型結構時，使用 force: true 可以保證每次同步後，資料庫表結構都是最新的。這樣可以避免因模型變更導致的數據不一致問題。
    // 注意 數據丟失 、 數據庫初始化 問題
    .sync() // 同步模型到資料庫，確保資料庫的結構和定義的模型一致
    .then((result) => { // 同步完成後，這段程式碼會查找主鍵（Primary Key）為 1 的用戶
        return User.findByPk(1);
        // console.log(result);
    })
    .then((user) => { // 如果找不到用戶，則創建一個新的用戶
        if (!user) {
            return User.create({ name: 'Max', email: 'test@test.com' });
        }
        return user;
    })
    /** PREVENT DUPLICATE CART CREATION */
    .then((user) => { // 購物車不存在，則創建一個新的購物車
        return user.getCart().then((cart) => {
            if (!cart) {
                return user.createCart();
            }
            return cart;
        });
    })
    .then((cart) => { // 完成以上操作後，啟動 Node.js 伺服器，監聽 3000 端口
        // console.log(cart);
        app.listen(3000);
    })
    .catch((err) => {
        console.log(err);
    });
