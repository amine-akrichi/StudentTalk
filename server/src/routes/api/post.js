const express = require("express");
const router = express.Router();
const Post = require("../../models/post");

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

module.exports = router;
