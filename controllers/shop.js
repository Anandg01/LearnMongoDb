const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.find().then(data=>{

    res.render('shop/product-list', {
      prods: data,
      pageTitle: 'All Products',
      path:'/products'
    });
  })
  .catch(err=>console.log(err))
};

exports.getProduct=(req, res)=>{
  const probId=req.params.productId;
  Product.findById(probId)
  .then(data=>{
    res.render('shop/product-detail',{
      product:data,
      pageTitle:data.title,
      path:'/products'
    })
  })
  .catch(err=>console.log(err))
 
}

exports.getIndex = (req, res, next) => {
 Product.find().then(resutl=>{
  res.render('shop/index', {
    prods: resutl,
    pageTitle: 'Shop',
    path: '/'
  });
 })
 .catch(err=>console.log(err))
};

exports.getCart = (req, res, next) => {
req.user
.populate("cart.items.productId")
.then(user=>{
  const products=user.cart.items;
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart',
    products :products
    });

})
.catch(err=>console.log(err))
}

exports.postcart=(req, res)=>{

  const probId=req.body.productId;
  Product.findById(probId)
  .then(product=>{
    return  req.user.addTocart(product);
  })
  .then(result=>{
    console.log(result)
    res.redirect('/cart');
  })
//  let  fetchedCart;
//  let newQuintity=1
//   req.user
//   .getCart()
//   .then(cart=>{
//     fetchedCart=cart;
//     return cart.getProducts({where:{id:probId}})
//   })
//   .then(products=>{

//     let product;
//     if(products.length>0){
//      product=products[0];
//        }
//   if(product){
//     const oldQuantity=product.cartItem.quantity;
//     newQuintity=oldQuantity+1;
//     return product
//   }
//    return Product.findByPk(probId)
//   })
//  .then(product=>{
//   return fetchedCart.addProduct(product,{
//     through:{quantity:newQuintity}
//   })
//  }).then(()=>{
//   res.redirect('/cart');
//  })
//   .catch(err=>console.log(err))
}

exports.postCartDeleteItem=(req, res)=>{
  const ProductId=req.body.productId;

  req.user.deleteCartItem(ProductId)
  // .then(cart=>{
  //   return cart.getProducts({where:{id:ProductId}})
  // })
  // .then(products=>{
  //   const product=products[0];
  //   return product.cartItem.destroy();
  // })
  .then(()=>{
    res.redirect('/cart')

  })
  .catch(err=>console.log(err))
}

exports.getOrders = (req, res, next) => {
  req.user.getOrders()
  .then(order=>{
    res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'Your Orders',
      orders:order
    });
  })
  .catch(err=>console.log(err))

};
exports.postOrder=(req,res)=>{
  req.user.addOrder()
  .then(result=>{
    console.log(result)
    res.redirect('/orders')

  })
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};

