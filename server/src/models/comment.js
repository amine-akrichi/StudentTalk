const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  postId: String,
  userId: String,
  commentCreationDate: Date,
  commentDetails: String,
});

module.exports = mongoose.model("comment", userSchema, "comments");
