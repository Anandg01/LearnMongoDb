const path = require('path');
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const mongoos=require('mongoose')

const errorController = require('./controllers/error');
const Users=require('./models/user');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

  const adminRoutes = require('./routes/admin');
 const shopRoutes = require('./routes/shop');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use((req, res, next)=>{
 Users.findById("64bd3b2cddc441625666ca74")
  .then(user=>{
    req.user=user;
    console.log(user)
    next()
  })
  .catch(err=>console.log(err))
})

 app.use('/admin', adminRoutes);
 app.use(shopRoutes);

app.use(errorController.get404);

mongoos.connect(process.env.URI)
.then(res=>{
  Users.findOne().then(user=>{
    if(!user){
      const u1=new Users({name:"Alok", email:"al@gmail.ocm"})
      u1.save()
    }
  })
  app.listen(2000, console.log('serve Running'))
})
.catch(err=>console.log(err))