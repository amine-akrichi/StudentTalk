const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "src/uploads/profileImages");
  },
  filename: (req, file, callBack) => {
    console.log(file);
    callBack(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/uploadImage", upload.single("profileImage"), (req, res) => {
  const image = req.file;
  console.log(image.filename);
  if (image) {
    res.status(200).send(image);
  } else {
    console.log("no file");
  }
});

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

router.post("/findUserWithComment", async (req, res) => {
  let commentData = req.body;
  try {
    let user = await User.findOne({ _id: commentData.userId });
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
