const path = require('path');
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const mongoos=require('mongoose')

const errorController = require('./controllers/error');
const User=require('./models/user');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

  const adminRoutes = require('./routes/admin');
 const shopRoutes = require('./routes/shop');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use((req, res, next)=>{
  // User.findUserByid("64bb5d63219b8853ac3070fd")
  // .then(user=>{
  //   req.user=new User(user.name,user.email,user.cart,user._id);
  //   next()
  // })
  // .catch(err=>console.log(err))
  next()
})

 app.use('/admin', adminRoutes);
 app.use(shopRoutes);

app.use(errorController.get404);

mongoos.connect(process.env.URI)
.then(res=>{
  app.listen(2000, console.log('serve Running'))
})
.catch(err=>console.log(err))