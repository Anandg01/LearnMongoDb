const user=require('../models/user');


exports.usercrete=(req, res, next)=>{
    user.create({name:'anand', email:"a@gmail.com"})
    .then(res=>console.log(res,'add product',))
    .catch(err=>console.log(err))
}