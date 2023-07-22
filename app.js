const path = require('path');
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongoConnect=require('./util/database').MongoClient
const User=require('./models/user');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

 const adminRoutes = require('./routes/admin');
 const shopRoutes = require('./routes/shop');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use((req, res, next)=>{
  User.findUserByid("64bb5d63219b8853ac3070fd")
  .then(user=>{
    req.user=new User(user.name,user.email,user.cart,user._id);
    console.log("user is present is",user)
    next()
  })
  .catch(err=>console.log(err))
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect( ()=>{
  app.listen(2000,console.log("server runnig..."))
})
