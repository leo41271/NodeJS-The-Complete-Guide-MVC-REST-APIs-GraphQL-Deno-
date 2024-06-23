const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    /** REPLACE CONNECTION STRING IF USING ATLAS
     *  "mongodb+srv://<username>:<password>@<cluster-id>.mongodb.net/<dbName>?retryWrites=true&authSource=admin"
     */
    MongoClient.connect(
        'mongodb://127.0.0.1:27017/shop?retryWrites=true&authSource=admin'
    )
        .then((client) => {
            console.log('Connected!');
            _db = client.db();
            callback(); // 透過此處的 callback 在成功連線後 能繼續後續的其他操作。
        })
        .catch((err) => {
            console.log(err);
            throw err;
        });
};

const getDb = () => { // 其他資料庫操作
    if (_db) {
        return _db; 
    }
    throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
