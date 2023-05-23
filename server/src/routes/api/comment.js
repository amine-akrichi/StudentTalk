const express = require("express");
const router = express.Router();
const Comment = require("../../models/comment");
const Post = require("../../models/post");

router.get("/", (req, res) => {
  res.send("comments");
});

router.post("/addComment", async (req, res) => {
  try {
    let comment = new Comment(req.body);
    let addedComment = await comment.save();
    res.status(200).send(addedComment);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.post("/updateComment", async (req, res) => {
  try {
    let commentData = req.body;
    let commentToUpdate = new Comment(commentData);
    let updatedComment = await Comment.findOneAndUpdate(
      { _id: commentToUpdate._id },
      commentToUpdate,
      {
        new: true,
      }
    );
    res.status(200).send(updatedComment);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.post("/deleteComment", async (req, res) => {
  try {
    let commentData = req.body;
    let commentToDelete = new Comment(commentData);
    let deleteComment = await Comment.findByIdAndDelete(commentToDelete, {
      new: true,
    });
    res.status(200).send(deleteComment);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.post("/listPostComments", async (req, res) => {
  try {
    let postData = req.body;
    let post = new Post(postData);
    let postComments = await Comment.find({ postId: post._id });
    res.status(200).send(postComments);
  } catch (error) {}
});

module.exports = router;
