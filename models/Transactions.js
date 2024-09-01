const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema(
  {
    walletAddress: {
      type: String,
      required: true,
      // Index for faster lookup by wallet address
    },
    transactionArray: {
      type: Array,
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
