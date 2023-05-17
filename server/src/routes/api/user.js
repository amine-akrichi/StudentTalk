const express = require("express");
const router = express.Router();
const User = require("../../models/user");

router.get("/", (req, res) => {
  res.send("user");
});

router.post("/updateUser", async (req, res) => {
  try {
    let userData = req.body;
    let userToUpdate = new User(userData);
    let updatedUser = await User.findOneAndUpdate(
      { _id: userToUpdate._id },
      userToUpdate,
      { new: true }
    );
    res.status(200).send(updatedUser);
  } catch (error) {
    console.log(error);
  }
});

router.post("/deleteUser", async (req, res) => {
  try {
    let userData = req.body;
    let deletedUser = await User.findOneAndDelete({
      username: userData.username,
    });
    res.status(200).send(deletedUser);
  } catch (error) {
    console.log(error);
  }
});

router.get("/listUsers", async (req, res) => {
  try {
    let usersList = await User.find();
    res.status(200).send(usersList);
  } catch (error) {
    console.log(error);
  }
});

router.post("/findUserWithPost", async (req, res) => {
  let postData = req.body;
  try {
    let user = await User.findOne({ _id: postData.userId });
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
