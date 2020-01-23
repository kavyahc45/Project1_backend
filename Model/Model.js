var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TaskSchema = new Schema({
    firstname: {
    type: String,
    required: true
},

password:{
    type: String,
    required: true
},

email:{
    type: String,
    required: true
},
role:{
    type:String,
    default:"user"
    }
});

module.exports = mongoose.model('Tasks', TaskSchema);