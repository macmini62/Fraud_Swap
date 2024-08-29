const express = require("express");
const postData = require("./controller.js");

router = express.Router()

router.get("/proxy/:phoneNumber", postData)

module.exports = router;