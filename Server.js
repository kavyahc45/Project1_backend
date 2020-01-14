var express = require('express');
var app = express();
 var port = process.env.PORT || 4002;
 var mongoose = require('mongoose');
 var Task = require('./Model/Model');
 var Task = require('./Model/Modelaccount');
 var bodyParser = require('body-parser');
  
 var cors = require("cors")

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Project',{ useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

var routes = require('./Router/Router');
routes(app); 

app.use((error,req,res,next)=>{
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({
        message:message
    });
});

app.listen(port);


console.log('todo list RESTful API server started on: ' + port);





// var cors = require("cors")
// var bodyParser = require("body-parser")
// const express = require('express');
// var app = express();
// var mongoose = require("mongoose")
// var port = process.env.PORT || 4013
// mongoose.set('useCreateIndex', true);

// app.use((req, res, next) => {
// res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
// res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
// next();
// });

// app.use(bodyParser.json())
// app.use(cors())
// app.use(
// bodyParser.urlencoded({
// extended: false
// })
// )
// const mongoURI = 'mongodb://localhost:27017/project1-backend'

// mongoose
// .connect(mongoURI, { useNewUrlParser: true })
// .then(() => console.log("mongoDB connected"))
// .catch(err => console.log(err))

// const Users = require('./Router/Users')
// const UserProfile = require('./Router/UserPro')



// app.use('/users', Users)
// app.use('/users', UserProfile)

// app.get('/', function (req, res) {
// res.send('hello');
// });


// app.listen(port, () => {
// console.log("server is running on port :" + port)
// })