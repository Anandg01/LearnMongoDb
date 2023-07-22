const getDb=require('../util/database').getDb;
const mongodb=require("mongodb");
const { use } = require('../routes/admin');
class Product{
  constructor(title, price, description, imageUrl,id,userId)
  {
    this.title=title;
    this.price=price;
    this.imageUrl=imageUrl;
    this.description=description;
    this._id=id?new mongodb.ObjectId(id):null;
    this.userId=new mongodb.ObjectId(userId)
  }
  save(){
    console.log(this)
    const db=getDb();
    let DevOp;

    if(this._id){
    DevOp=db.collection('products').updateOne({_id:new mongodb.ObjectId(this._id)},{$set:this})
    }
    else{
   DevOp=db.collection('products').insertOne(this)
    }
   return DevOp
    .then(res=>{
      console.log(res)
    })
    .catch(err=>console.log(err))
  }
  static fetchAll(){
    const db=getDb()
    return db.collection('products')
    .find()
    .toArray()
    .then(Products=>{
      console.log(Products)
      return Products;
    })
    .catch(err=>{ 
      console.log(err)
    })
  }
static findById(probId){
  const db=getDb()
  return db
  .collection("products")
  .find({_id:new mongodb.ObjectId(probId)})
  .next()
  .then(product=>{
   console.log(product)
   return product;
  })
  .catch(err=>{
    console.log(err)
  })
}
static deleteById(parobId){
  const db=getDb()
 return db.collection("products").deleteOne({_id: new mongodb.ObjectId(parobId)})
 .then(result=>{
  console.log(result)
 })
 .catch(err=>console.log(err))
}
}

module.exports=Product;