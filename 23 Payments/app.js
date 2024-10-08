const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
/** CSRF-CSRF PACKAGE */
const { doubleCsrf: csrf } = require('csrf-csrf');
const cookieParser = require('cookie-parser');
/** ================ */
const flash = require('connect-flash');
const multer = require('multer');

const errorController = require('./controllers/error');
const User = require('./models/user');

/** REPLACE CONNECTION STRING IF USING ATLAS
 *  "mongodb+srv://<username>:<password>@<cluster-id>.mongodb.net/<dbName>?retryWrites=true&authSource=admin"
 * "mongodb+srv://userleo:<password>@cluster-name-mongo-lear.XXXXXXX.mongodb.net/?retryWrites=true&w=majority&appName=cluster-name-mongo-learn"
 * MONGODB_URI 通常已經包含了資料庫名稱
 */
const MONGODB_URI =
    'mongodb://127.0.0.1:27017/shop?retryWrites=true&authSource=admin';

const app = express();
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions',
});
/** CSRF-CSRF PACKAGE */
const csrfProtection = csrf({
    getSecret: () => 'supersecret',
    getTokenFromRequest: (req) => {
        if (req.body._csrf) {
            return req.body._csrf;
        }
        if (req.get('csrf-token') !== '') {
            return req.get('csrf-token');
        }
    },
});
/** ====================== */

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        /** DO NOT USE new Date().toISOString() on Windows */
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(
    multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(
    session({
        secret: 'my secret',
        resave: false,
        saveUninitialized: false,
        store: store,
    })
);
/** CSRF-CSRF PACKAGE */
app.use(cookieParser('supersecret'));
app.use(csrfProtection.doubleCsrfProtection);
/** ================ */
app.use(flash());

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});

app.use((req, res, next) => {
    // throw new Error('Sync Dummy');
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
        .then((user) => {
            if (!user) {
                return next();
            }
            req.user = user;
            next();
        })
        .catch((err) => {
            next(new Error(err));
        });
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.get('/500', errorController.get500);

app.use(errorController.get404);

app.use((error, req, res, next) => {
    // res.status(error.httpStatusCode).render(....)
    // res.redirect('/500');
    res.status(500).render('500', {
        pageTitle: 'Error!',
        path: '/500',
        isAuthenticated: req.session.isLoggedIn,
    });
});

mongoose
    .connect(MONGODB_URI)
    .then((result) => {
        app.listen(3000);
    })
    .catch((err) => {
        console.log(err);
    });
