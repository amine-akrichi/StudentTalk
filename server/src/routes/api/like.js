const express = require("express");
const router = express.Router();
const Like = require("../../models/like");
const Post = require("../../models/post");

router.get("/", (req, res) => {
  res.send("like");
});

router.post("/addLike", async (req, res) => {
  try {
    let likeData = req.body;
    let like = new Like(likeData);
    let addedLike = await like.save();
    res.status(200).send(addedLike);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.post("/deleteLike", async (req, res) => {
  try {
    let likeDate = req.body;
    let deletedLike = await Like.findOneAndDelete({
      _id: likeDate._id,
    });
    res.status(200).send(deletedLike);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.post("/listPostLikes", async (req, res) => {
  try {
    let postData = req.body;
    let post = new Post(postData);
    let postLikes = await Like.find({ postId: post._id });
    res.status(200).send(postLikes);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
