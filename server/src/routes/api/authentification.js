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
  res.send("auth");
});

router.post("/register", async (req, res) => {
  try {
    let userData = req.body;
    let user = new User(userData);
    let userExist = await User.findOne({ username: userData.username });
    if (!userExist) {
      let registeredUser = await user.save();
      res.status(200).send(registeredUser);
    } else {
      res.status(401).send("User already exists");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    let userData = req.body;
    let user = await User.findOne({ username: userData.username });
    if (!user) {
      res.status(401).send("Invalid username");
    } else if (user.password !== userData.password) {
      res.status(401).send("Invalid password");
    } else {
      res.status(200).send(user);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
