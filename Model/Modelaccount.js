var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TaskSchema = new Schema({
 Name: {
    type: String,
    required: true
},

// email:{
//     type: String,
//     required: true
// },

// Address:{
//     type: String,
//     required: true
// },
// MobileNum:{
//     type: Number,
//     required: true
// },

Create_At:{

    type: Date,
   default: Date.now
},
Update_At:{

    type: Date,
   default: Date.now
}

});

module.exports = mongoose.model('Tasks1', TaskSchema);