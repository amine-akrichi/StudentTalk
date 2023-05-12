const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userId: String,
  postTitle: String,
  postDetails: String,
  imageUrl: String,
});

module.exports = mongoose.model("post", userSchema, "posts");
