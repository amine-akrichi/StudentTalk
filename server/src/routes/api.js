const express = require("express");
const dbconnect = require("../config/db");
const router = express.Router();
const user = require("./api/user");
const auth = require("./api/authentification");
const like = require("./api/like");
const post = require("./api/post");
const comment = require("./api/comment");
dbconnect();

router.use("/user", user);
router.use("/authentification", auth);
router.use("/post", post);
router.use("/like", like);
router.use("/comment", comment);

router.get("/", (req, res) => {
  res.send("Hello from API");
});

module.exports = router;
