const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
    Product.findAll()
        .then((products) => {
            res.render('shop/product-list', { // 導向到 view/shop 的資料夾頁面 給ejs 使用 下面三個 是傳進去顯示頁面的參數
                prods: products,
                pageTitle: 'All Products',
                path: '/products', // 網頁 中 網址顯示的路徑 ， 上面的render('sh...則是 內部 使用ejs 的路徑 告訴後端要渲染哪個模板
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    // Product.findAll({ where: { id: prodId } })
    //     .then((products) => {
    //         res.render('shop/product-detail', {
    //             product: products[0],
    //             pageTitle: products[0].title,
    //             path: '/products',
    //         });
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });
    Product.findByPk(prodId)
        .then((product) => {
            res.render('shop/product-detail', {
                product: product,
                pageTitle: product.title,
                path: '/products',
            });
        })
        .catch((err) => console.log(err));
};

exports.getIndex = (req, res, next) => {
    Product.findAll()
        .then((products) => {
            res.render('shop/index', {
                prods: products,
                pageTitle: 'Shop',
                path: '/',
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.getCart = (req, res, next) => {
    req.user
        .getCart()
        .then((cart) => {
            console.log(cart);
            return cart
                .getProducts() //  cart.getProducts() (回傳後 的 promise 物件再去執行 getProducts 函式)
                .then((products) => {
                    res.render('shop/cart', {
                        path: '/cart',
                        pageTitle: 'Your Cart',
                        products: products,
                    });
                })
                .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
};

exports.postCart = (req, res, next) => { // 將產品添加到購物車中。如果產品已經存在於購物車中，則增加其數量；如果產品尚不存在，則將其新增到購物車
    const prodId = req.body.productId;
    let fetchedCart;
    let newQuantity = 1;
    req.user
        .getCart()
        .then((cart) => {
            fetchedCart = cart;
            return cart.getProducts({ where: { id: prodId } });
        })
        .then((products) => {
            let product;
            if (products.length > 0) {
                product = products[0];
            }
            if (product) {
                const oldQuantity = product.cartItem.quantity;
                newQuantity = oldQuantity + 1;
                return product;
            }
            return Product.findByPk(prodId); // 當東西不存在 去資料庫尋找該產品並回傳
        })
        .then((product) => {
            return fetchedCart.addProduct(product, {
                through: { quantity: newQuantity },
            });
        })
        .then(() => {
            res.redirect('/cart');
        })
        .catch((err) => console.log(err));
};

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    req.user
        .getCart()
        .then((cart) => {
            return cart.getProducts({ where: { id: prodId } });
        })
        .then((products) => {
            const product = products[0];
            return product.cartItem.destroy();
        })
        .then(() => {
            res.redirect('/cart');
        })
        .catch((err) => console.log(err));
};

exports.postOrder = (req, res, next) => {
    let fetchedCart;
    req.user
        .getCart()
        .then((cart) => {
            fetchedCart = cart;
            return cart.getProducts();
        })
        .then((products) => {
            return req.user
                .createOrder()
                .then((order) => {
                    order.addProducts(
                        products.map((product) => { // map 方法來遍歷購物車中的每個產品
                            product.orderItem = {
                                quantity: product.cartItem.quantity,
                            };
                            return product;
                        })
                    );
                })
                .catch((err) => console.log(err));
        })
        .then((result) => {
            return fetchedCart.setProducts(null);
        })
        .then((result) => {
            fetchedCart.setProducts(null); //fetchedCart.setProducts(null): 這裡再次調用 setProducts(null) 是為了確保購物車中的產品真正被清空。雖然前面已經調用了一次，但是可能因為非同步操作的特性，為了確保購物車完全清空，這裡再次調用了一次。
            res.redirect('/orders');
        })
        .catch((err) => console.log(err));
};
// 上述 使用 await 改善 (但程式並沒有實際跑過 gpt) 不用 再次使用setProducts // 之後的課程單元會有說到!!
// exports.postOrder = async (req, res, next) => {
//     try {
//         let fetchedCart = await req.user.getCart(); // 取得購物車
//         let products = await fetchedCart.getProducts(); // 取得購物車中的產品
//         // 創建訂單並將購物車中的產品轉移到訂單
//         let order = await req.user.createOrder();
//         await order.addProducts(products.map((product) => {
//             product.orderItem = {
//                 quantity: product.cartItem.quantity,
//             };
//             return product;
//         }));
//         // 清空購物車中的產品
//         await fetchedCart.setProducts(null);
//         res.redirect('/orders'); // 重定向到訂單頁面
//     } catch (err) {
//         console.log(err); // 錯誤處理
//     }
// };

exports.getOrders = (req, res, next) => {
    req.user
        .getOrders({ include: ['products'] })
        .then((orders) => {
            res.render('shop/orders', {
                path: '/orders',
                pageTitle: 'Your Orders',
                orders: orders,
            });
        })
        .catch((err) => console.log(err));
};
