const mongodb=require('mongodb')
const MongoClient=mongodb.MongoClient;

let _db;

const mongoConnect=(callback)=>{
    MongoClient.connect(process.env.URI).then(res=>{
        console.log("Connected")
        _db=res.db()
        callback()
    })
    .catch(err=>{
        console.log("err in this",err)
        throw err;
    })
}

const getDb=()=>{
    if(_db){
        return _db;
    }
    throw "No database found";
}

exports.MongoClient=mongoConnect;
exports.getDb=getDb;

