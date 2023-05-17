const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userId: String,
  postCreationDate: Date,
  postTitle: String,
  postContent: String,
  postImageUrl: String,
});

module.exports = mongoose.model("post", userSchema, "posts");
