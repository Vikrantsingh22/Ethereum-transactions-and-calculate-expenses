const express = require("express");
const router = express.Router();
const cryptoTransaction = require("../controller/CryptoTransaction");
const CalculateExpensesAndEtherPrice = require("../controller/ExpensesAndEtherPrice");

router.get("/fetchTransaction", cryptoTransaction);
router.get("/fetchExpense", CalculateExpensesAndEtherPrice);

module.exports = router;
