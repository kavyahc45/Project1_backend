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
   
},
Create_At:{

    type: Date,
   default: Date.now
},
Update_At:{

    type: Date,
   default: Date.now
}

});

module.exports = mongoose.model('price', TaskSchema);