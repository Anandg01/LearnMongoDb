const Product = require('../models/product');
const mongoDb=require('mongodb')
const ObjectId=mongoDb.ObjectId;
exports.getAddProduct = (req, res, next) => {
  res.render( 'admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing:false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

 const product= new Product({title:title, price:price, description:description, imageUrl:imageUrl})
 product.save()
 .then(result=>{
  console.log('Post Created Done')
  res.redirect('/')
})
  .catch(err=>console.log(err))
};

exports.getEditProduct = (req, res, next) => {
  const editMode=req.query.edit;
  if(!editMode){
   return res.redirect('/');
  }
const probId=req.params.productId;
Product.findById(probId)
.then(product=>{
  if(!product){
    res.redirect('/');
  }
  res.render( 'admin/edit-product', {
    pageTitle: 'Edit Product',
    path: '/admin/edit-product',
  editing:editMode,
  product:product
  });
})
.catch(err=>console.log(err))
  
};

exports.postEdit=(req, res, next)=>{
  const updateId=req.body.id;
  const updatetitle = req.body.title;
  const updaturl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
 
Product.updateOne({_id:updateId},{title:updatetitle,price:price,description:description,imageUrl:updaturl})
  .then(result=>{
    console.log("updated Record")
    res.redirect('/admin/products');
})
  .catch(err=>console.log(err))

}


exports.getProducts = (req, res, next) => {

 // Product.findAll()
 Product.find()
  .then(result=>{
    res.render('admin/products', {
      prods: result,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  })
  .catch(err=>console.log(err))
};

exports.postDelet=(req, res)=>{
 const proId=req.body.produtId

 Product.deleteOne({_id:proId})
.then(()=>{
  console.log('destroy record...')
  res.redirect('/admin/products')
})
 .catch(err=>console.log(err))
}