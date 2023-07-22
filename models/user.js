const getDb = require('../util/database').getDb;
const mongodb=require("mongodb");
const { get } = require('../routes/admin');
const ObjectId=mongodb.ObjectId;
class user{
    constructor(username, email,cart,id){
        this.username=username;
        this.email=email;
        this.cart=cart; //{items:[]}
        this._id=id;
    }

    save(){
        const db=getDb()
      console.log(this)
  return db.collection("users").insertOne(this)
   .then(result=>{
    console.log(result);
    return result;
   })
   .catch(err=>console.log(err))
    }

    addTocart(product){
        const cartProductIndex=this.cart.items.findIndex(cp=>{
            return cp.productId.toString()===product._id.toString();
        })
     let newQuantity=1;
     const updatedCartItem=[...this.cart.items];
        if(cartProductIndex>=0){
            newQuantity=this.cart.items[cartProductIndex].quantity+1;
            updatedCartItem[cartProductIndex].quantity=newQuantity;
        }
        else{
            updatedCartItem.push({
                productId:new ObjectId(product._id),
                quantity:newQuantity
            })
        }
        const updatedCart={items:updatedCartItem};
        const db=getDb()
        return db.collection("users")
        .updateOne({_id:new mongodb.ObjectId(this._id)},{$set:{cart:updatedCart}})
    }
   
    getCart(){
        const db=getDb();
        const productIds=this.cart.items.map(i=>{
            return i.productId;
        })

        return db
        .collection('products')
        .find({_id:{$in:productIds}})
        .toArray()
        .then(products=>{
          return products.map(p=>{
              return {
                ...p,
                quantity:this.cart.items.find(i=>{
                    return i.productId.toString()===p._id.toString()
                }).quantity
              }
           })
        })
    }

    deleteCartItem(cartId){
        console.log('this cart id ',cartId)
        const db=getDb()
        return db.collection("users")
        .updateOne(
            {_id:new ObjectId(this._id)},
            {
           $pull:{"cart.items":{productId:new ObjectId(cartId)}}
            }
        )
    }

    static findUserByid(userId){
        const db=getDb();
       return db.collection("users").find({_id: new mongodb.ObjectId(userId)})
        .next()
        .then(result=>{
            console.log(result)
            return result;
        })
        .catch(err=>console.log(err))
    }
}

module.exports=user;