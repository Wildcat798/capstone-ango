const express = require("express");
const router = express.Router();

router
    .use("/", require("./home"))
    .use("/user", require("./user"))
    .use("/blog", require("./blog"))

module.exports = router;