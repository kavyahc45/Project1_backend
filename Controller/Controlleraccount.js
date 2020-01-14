const mongoose = require('mongoose');
const UserData1 =require('../Model/Modelaccount');
const bcrypt =require('bcrypt');
const jwt = require('jsonwebtoken');
// var isAuth=require('../Middleware/isAuth')
    



exports.accounts = function(req,res){
    var userData = new UserData1(req.body);
    userData.save(function(err, data){
    if(err)
    res.send(err);
    res.json(data);
    })
    }

    exports.get_data = function(req, res) {
        UserData1.find({}, function(err, task) {
        if (err)
          res.send(err);
          res.json(task);
        });
      };

      exports.update_a_task = function(req, res)
      {
        UserData1.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, task) {
        if (err)
        res.send(err);
        res.json(task);
        });
      };

      exports.delete_a_task = function(req, res) {
        UserData1.remove({_id: req.params.id}, function(err, task) {
        if (err)
        res.send(err);
        res.json({ message: 'Task successfully deleted' });
        });
      };

