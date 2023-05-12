const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    postId: String,
    userId: String,
    type: Boolean,
})


module.exports = mongoose.model('like' , userSchema , 'likes')