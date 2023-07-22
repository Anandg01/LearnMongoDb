const getDb = require('../util/database').getDb;
const mongodb=require("mongodb")
class user{
    constructor(username, email){
        this.username=username;
        this.email=email;
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