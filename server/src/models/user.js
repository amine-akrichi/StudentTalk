const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: String,
    password: String,
    name: String,
    lastname: String,
    email: String,
})


module.exports = mongoose.model('user' , userSchema , 'users')