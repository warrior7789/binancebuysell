const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const UserSchema = mongoose.Schema({
    fullname       : { type: String,default: null},    
    email          : { type: String,default: null,index:true},
    password       : { type: String,default: null}, 

}, {
    timestamps: true
});

// Hash the plain text password before saving
UserSchema.pre('save', async function (next) {
    const user = this 
    if (user.isModified('password')) {
        console.log("changind password")
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})
module.exports = mongoose.model('user', UserSchema);