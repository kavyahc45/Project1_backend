const express = require("express")
const profile = express.Router();
const cors = require("cors")
profile.use(cors())
process.env.SECRET_KEY = 'secret'

profile.post('/UserProfile', (req, res) => {
const userData = {
username: req.body.studentname,
address: req.body.address,
email: req.body.email,
course: req.body.course,
mobileNumber: req.body.mobileNumber
}
UserProfile.findOne({
studentname: req.body.studentname,
address: req.body.address,
email: req.body.email,
mobileNumber: req.body.mobileNumber
})
.then(user => {
if (!user) {
UserProfile.create(userData)
.then(user => {
res.json({ status: 'user registered!' })
})
.catch(err => {
res.send('error: ' + err)
})
} else {
res.json({ error: 'User already exists' })
}
})
.catch(err => {
res.send('error: ' + err)
})
})

//seraching by student name
profile.get('/UserProfile', (req, res) => {
UserProfile.find({
username: req.query['studentname']
})
.then(user => {
if (user) {
res.json(user)
} else {
res.send("User does not exist")
}
})
.catch(err => {
res.send('error: ' + err)
})
})

// get all students deatils
profile.get('/student', (req, res) => {
UserProfile.find({

})
.then(user => {
if (user) {
res.json(user)
} else {
res.send("User does not exist")
}
})
.catch(err => {
res.send('error: ' + err)
})
})

// delete by id
profile.delete('/UserProfile', (req, res) => {
console.log(req.body.id, "delete")
UserProfile.findByIdAndDelete({
_id: req.body.id
})
.then(user => {
if (user) {
res.send("deleted")

} else {
res.send("User does not exist")
}
})
.catch(err => {
res.send('error: ' + err)
})
})

//edit by id
profile.get('/edit/:id', (req, res) => {
console.log(req.params, 'hi')
const id = req.params.id;
UserProfile.findById(id, function (err, StudentProfile) {
res.json(StudentProfile);
});
});

// update by id
profile.put('/UserProfile/update/:id', (req, res) => {
console.log(req.body, "update")
UserProfile.findOneAndUpdate({
_id: req.params.id
},
{
username: req.body.studentname,
address: req.body.address,
email: req.body.email,
course: req.body.course,
mobileNumber: req.body.mobileNumber
})
.then(user => {
res.json(req.body)
// res.send(req.body);
})
.catch(err => {
res.send('error: ' + err)
})
})


//student by name
profile.get('/UserProfile/:id', (req, res) => {
UserProfile.findOne({
username: "kavya"
})
.then(user => {
if (user) {
res.json(user)

} else {
res.send("User does not exist")
}
})
.catch(err => {
res.send('error: ' + err)
})
})

// course by particular name
profile.get('/course', (req, res) => {
UserProfile.find({
course: req.query['course']
})
.then(user => {
if (user) {
res.json(user)
} else {
res.send("User does not exist")
}
})
.catch(err => {
res.send('error: ' + err)
})
})



module.exports = profile;