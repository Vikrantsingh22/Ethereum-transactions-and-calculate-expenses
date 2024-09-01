const express = require("express");
const router = express.Router();
const cryptoTransaction = require("../controller/CryptoTransaction");

router.get("/fetchTransaction", cryptoTransaction);

module.exports = router;
