// var express = require('express');
// var app = express();
//  var port = process.env.PORT || 4013;
//  var mongoose = require('mongoose');
//  var Task = require('./Model/Model');
//  var bodyParser = require('body-parser');
  

// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/Project'); 


// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());


// var routes = require('./Router/Router');
// routes(app); 

// app.use((error,req,res,next)=>{
//     console.log(error);
//     const status = error.statusCode || 500;
//     const message = error.message;
//     res.status(status).json({
//         message:message
//     });
// });

// app.listen(port);


// console.log('todo list RESTful API server started on: ' + port);var express = require("express")
var cors = require("cors")
var bodyParser = require("body-parser")
const express = require('express');
var app = express();
var mongoose = require("mongoose")
var port = process.env.PORT || 4013
mongoose.set('useCreateIndex', true);

app.use((req, res, next) => {
res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
next();
});

app.use(bodyParser.json())
app.use(cors())
app.use(
bodyParser.urlencoded({
extended: false
})
)
const mongoURI = 'mongodb://localhost:27017/project1-backend'

mongoose
.connect(mongoURI, { useNewUrlParser: true })
.then(() => console.log("mongoDB connected"))
.catch(err => console.log(err))

// const Users = require('./routes/Users')
// const StudentProfile = require('./routes/StudentPro')



// app.use('/users', Users)
// app.use('/users', StudentProfile)

app.get('/', function (req, res) {
res.send('hello');
});


app.listen(port, () => {
console.log("server is running on port :" + port)
})