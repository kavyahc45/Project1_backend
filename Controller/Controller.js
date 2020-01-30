const mongoose = require('mongoose');
const UserData =require('../Model/Model');
const Vechical =require('../Model/Vehiclemodel');
const Crop = require('../Model/crop')
const bcrypt =require('bcrypt');
const jwt = require('jsonwebtoken');
var isAuth=require('../Middleware/isAuth')
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
var nodemailer = require ('nodemailer');
    

exports.get_a_data = function(req, res) {
  UserData.find({}, function(err, task) {
  if (err)
    res.send(err);
    res.json(task);
  });
};
// exports.signup= function(req, res){
//   console.log ("hii")
//   const reg_email=/^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/;
//   // const reg_mob=/^[0-9]{10}$/;
//   const reg_pwd=/^[@#][A-Za-z0-9]{9,11}$/;
//   if(!reg_pwd.test(req.body.password)){
//     console.log(req.body.password)
//     res.send('password is invalid');
//   }
  
//   // if(!reg_mob.test(req.body.Mobnum)){
//   //   res.send('Mobile number is invalid');
//   // }
//   if(reg_email.test(req.body.email)){
//     UserData.find({email: req.body.email},function(err, data){
//       if(data != null && data != ''){
//         res.send('User already exists');
//       }
//       else
//       {
//         var userData = new UserData(req.body);
//         bcrypt.genSalt(10, function(err, salt){
//           bcrypt.hash(userData.password, salt, function(err, hash) {
//             userData.password = hash;
//             userData.save(function(err, data){
//               if(err)
//                 res.send(err.message);
//               res.json('User Created Succesfully');
//             })
//           })
//         })
//       }
//     });
//   }
//   else {
//     res.send('Email is invalid');
//   }
// };

exports.read_a_task = function(req, res) 
{
  UserData.findById(req.params.taskId, function(err, task) {
  if (err)
  res.send(err);
  res.json(task);
  });
  };

exports.update_a_task = function(req, res)
{
  UserData.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
  if (err)
  res.send(err);
  res.json(task);
  });
};
exports.delete_a_task = function(req, res) {
  UserData.remove({_id: req.params.taskId}, function(err, task) {
  if (err)
  res.send(err);
  res.json({ message: 'Task successfully deleted' });
  });
};

exports. signup= function(req, res){
  console.log(req.body,"connect")
  const reg_email=/^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/;
  // const reg_mob=/^[0-9]{10}$/;
  const reg_pwd=/^[a-zA-Z0-9@*#]{8,15}$/;
  if(!reg_pwd.test(req.body.password)){
  console.log(req.body.password)
  res.send('password is invalid');
  }
  // if(!reg_mob.test(req.body.mobile)){
  // res.send('Mobile number is invalid');
  // }
  if(reg_email.test(req.body.email)){
  UserData.find({email: req.body.email},function(err, data){
  if(data != null && data != ''){
  res.send('User already exists');
  }
  else{
  var userData = new UserData(req.body);
  // bcrypt.genSalt(10, function(err, salt){
  // bcrypt.hash(userData.password, salt, function(err, hash) {
  // userData.password = hash;
  
  const pword = cryptr.encrypt(req.body.password);
  userData.password = pword;
  userData.save(function(err, data){
  if(err)
  res.send(err.message);
  res.json('User Created Succesfully');
  })
  // })
  // })
  }
  });
  }
  else {
  res.send('Email is invalid');
  }var transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
  user: 'kavyahc021@gmail.com',
  pass: 'manipuri'
  }
  });
  mailOptions = {
  from: 'kavyahc021@gmail.com@gmail.com',
  to: req.body.email,
  subject: 'Registration',
  text: `Successfully registered to CHARITY.`
  };
  transporter.sendMail(mailOptions, (error, info)=>{
  if (error) {
  return console.log(error.message);
  } else {
  console.log('Email sent: ' + info.response);
  }
  });
  };
  exports.changepassword = (req, res)=> {
    console.log(req.body,"hai")
    const pword = cryptr.encrypt(req.body.password);
    req.body.password = pword;
    UserData.findOneAndUpdate({email: req.body.email}, req.body, {new: true}, function(err, task) {
    if (err)
    res.send(err);
    res.json(task);
    });
    };
    exports.userSignin = (req,res,next) =>{
    const email = req.body.email;
    const password = req.body.password;
    const role=req.body.role;
    let loadedUser;
    UserData.findOne({email: email})
    .then(user =>{
    if(!user){
    const error = new Error('A user with this email could not be found.');
    error.statusCode = 401;
    throw error;
    }
    loadedUser = user;
    const pword = cryptr.decrypt(user.password);
    // console.log("hi",password,pword)
    return (password===pword);
    // return (password===user.password?true:false)
    }) 
    .then(isEqual =>{
    if(!isEqual){
    const error = new Error('wrong password.');
    error.statusCode = 401;
    throw error;
    }
    const token = jwt.sign(
    { 
    role:loadedUser.role,
    email: loadedUser.email,
    userId:loadedUser._id.toString()
    },'secret')
    return res.status(200).json({token: token, userId: loadedUser._id.toString(), email: loadedUser.email , role: loadedUser.role})
    })
    .catch(err => {
    if (!err.statusCode) {
    err.statusCode = 500;
    }
    next(err);
    }); 
    } 

// exports.userSignin = (req,res,next) =>{
//   console.log(req.body)
//   const email = req.body.email;
//   const password = req.body.password;
//   let loadedUser;
//   UserData.findOne({email: email})
//   .then(user =>{
//     if(!user){
//       const error = new Error('A user with this email could not be found.');
//       error.statusCode = 401;
//       throw error;
    
//     }
//     loadedUser = user;
//     // return (password===user.password?true:false) 
//     return bcrypt.compare(password,user.password);
//  })
//   .then(isEqual =>{
//     if(!isEqual){
//       const error = new Error('wrong password.');
//       error.statusCode = 401;
//       throw error;
//     }
//     const token = jwt.sign(
//     {
//       role:loadedUser.role,
//       email: loadedUser.email,
//       userId:loadedUser._id.toString()
//     },'secret')
//     return res.status(200).json({token: token, userId: loadedUser._id.toString(), email: loadedUser.email , role: loadedUser.role})
//   })
//   .catch(err => {
//     if (!err.statusCode) {
//       err.statusCode = 500;
//     }
//     next(err);
//   }); 
// }



// exports.Vehicle = (req,res,next) =>{
  
// }
// exports.vehicles = function(req,res){
//   var userData = new UserData1(req.body);
//   userData.save(function(err, data){
//   if(err)
//   res.send(err);
//   res.json(data);
//   })
//   }

  exports.get_data = function(req, res) {
    Vechical.find({}, function(err, task) {
      if (err)
        res.send(err);
        res.json(task);
      });
    };

    // exports.update_a_task = function(req, res)
    // {
    //   vechical.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, task) {
    //   if (err)
    //   res.send(err);
    //   res.json(task);
    //   });
    // };

    // exports.delete_a_task = function(req, res) {
    //   vechical.remove({_id: req.params.id}, function(err, task) {
    //   if (err)
    //   res.send(err);
    //   res.json({ message: 'Task successfully deleted' });
    //   });
    // };


    exports.price = (req, res, next) => {
      console.log(req.body)
      const  vechical = new Vechical({
        name: req.body.name,
        vehicletype:req.body.vehicletype,
        vehiclename:req.body.vehiclename,
        price: req.body.price,
        premium: req.body.price/10
      })
      return vechical.save()
      .then(result => {
      res.status(200).json({
      result
      })
      })
      }
      exports.cropPrice = (req, res, next) => {
        console.log(req.body)
        var initialPrice;
        if(req.body.cropname=="Paddy"){
          initialPrice=1000;
        }
        else{
          initialPrice=2500;
        }

        const  crop = new Crop({
          name: req.body.name,
          cropname:req.body.cropname,
          area:req.body.area,
          price: initialPrice*req.body.area,
          premium: (initialPrice*req.body.area)/10
        })
        return crop.save()
        .then(result => {
        res.status(200).json({
        result
        })
        })
        }
        exports.get_cropdetailes = function(req, res) {
          Crop.find({}, function(err, task) {
            if (err)
              res.send(err);
              res.json(task);
            });
          };
        
             
            