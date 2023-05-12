const express = require("express");
const dbconnect = require("../config/db");
const router = express.Router();
const user = require("./api/user");
const auth = require("./api/authentification");
const comment = require("./api/comment");
const like = require("./api/authentification");
const post = require("./api/post");
dbconnect();

router.use("/user", user);
router.use("/authentification", auth);
router.use("/post", post);
router.use("/like", like);

router.get("/", (req, res) => {
  res.send("Hello from API");
});

module.exports = router;
