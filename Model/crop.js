var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TaskSchema = new Schema({
    name: {
    type: String,
    
},

cropname:{
    type: String,
    
},

area:{
    type: Number,
    
},

price:{
    type: Number,
    default:null
},

premium:{
    type: Number,
    default:null
   
}

});

module.exports = mongoose.model('Crops', TaskSchema);