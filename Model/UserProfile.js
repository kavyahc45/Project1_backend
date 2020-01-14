const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
username: {
type: String,
required: true
},
address: {
type: String,
required: true
},
email: {
type: String,
required: true
},
course: {
type: String,
required: true
},
mobileNumber: {
type: Number,
required: true
},

});

const UserProfile = mongoose.model('profile', UserSchema);

module.exports = UserProfile;