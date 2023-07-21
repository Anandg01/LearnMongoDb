const getDb=require('../util/database').getDb;
class Product{
  constructor(title, price, description, imageUrl)
  {
    this.title=title;
    this.price=price;
    this.imageUrl=imageUrl;
    this.description=description;
  }
  save(){
    console.log(this)
    const db=getDb();
   return db.collection('products').insertOne(this)
    .then(res=>{
      console.log(res)
    })
    .catch(err=>console.log(err))
  }
}

module.exports=Product;