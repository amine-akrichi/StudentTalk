const express = require("express");
const router = express.Router();
const Post = require("../../models/post");
const User = require("../../models/user");

router.get("/", (req, res) => {
  res.send("post");
});

router.post("/addPost", async (req, res) => {
  try {
    let postData = req.body;
    let post = new Post(postData);
    let registeredPost = await post.save();
    res.status(200).send(registeredPost);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.post("/updatePost", async (req, res) => {
  try {
    let postData = req.body;
    let postToUpdate = new Post(postData);
    let updatedPost = await Post.findOneAndUpdate(
      { _id: postToUpdate._id },
      postToUpdate,
      { new: true }
    );
    res.status(200).send(updatedPost);
  } catch (error) {
    console.log(error);
  }
});

router.post("/deletePost", async (req, res) => {
  try {
    let postData = req.body;
    let postToDelete = new Post(postData);
    let deletedPost = await Post.findOneAndDelete({
      _id: postToDelete._id,
    });
    res.status(200).send(deletedPost);
  } catch (error) {
    console.log(error);
  }
});

router.get("/listPosts", async (req, res) => {
  try {
    let postsList = await Post.find();
    res.status(200).send(postsList);
  } catch (error) {
    console.log(error);
  }
});

router.post("/listUserPosts", async (req, res) => {
  let userDate = req.body;
  let user = new User(userDate);
  try {
    let UserPostsList = await Post.find({ userId: user._id });
    res.status(200).send(UserPostsList);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
