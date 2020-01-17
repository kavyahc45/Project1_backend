var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TaskSchema = new Schema({
    name: {
    type: String,
    
},

vehicletype:{
    type: String,
    
},

vehiclename:{
    type: String,
    
},

price:{
    type:Number,
},

premium:{
    type: Number,
    default:null
   
}

});

module.exports = mongoose.model('price', TaskSchema);