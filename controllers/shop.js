const Product = require('../models/product');
const Order=require('../models/order')
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
.populate("cart.items.productId",)
.then(user=>{
  const products=user.cart.items;
  console.log(products)
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
}

exports.postCartDeleteItem=(req, res)=>{
  const ProductId=req.body.productId;

  req.user.removeTocart(ProductId)
  .then(()=>{
    res.redirect('/cart')

  })
  .catch(err=>console.log(err))
}

exports.getOrders = (req, res, next) => {
  Order.find({"user.userId":req.user._id})
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
  req.user
.populate("cart.items.productId",)
.then(user=>{
  const products=user.cart.items.map(i=>{
    return {quantity:i.quantity, product:{...i.productId._doc}}
  })
  const order=new Order({
    user:{
      name:req.user.name,
      userId:req.user._id
    },
    products:products
  })
  return order.save()
  })
  .then(result=>{
    req.user.ClearCart().then((re)=>{
   return re;
    })
  })
  .then((re)=>{
    console.log(re)
    res.redirect('/cart')
  })
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};

