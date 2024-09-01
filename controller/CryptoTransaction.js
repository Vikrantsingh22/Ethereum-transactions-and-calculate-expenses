const { default: mongoose } = require("mongoose");
const addressModel = require("../models/address");
const transactionModel = require("../models/Transactions");
const axios = require("axios");
const fetchTransaction = async (req, res) => {
  const { walletAddress } = req.body;

  const session = await mongoose.startSession();
  if (!walletAddress || !/^0x[a-fA-F0-9]{40}$/.test(walletAddress)) {
    return res.status(400).json({ message: "Invalid wallet address" });
  }
  try {
    session.startTransaction();
    const response = await axios.get(
      `https://api.etherscan.io/api?module=account&action=txlist&address=${walletAddress}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${process.env.ETHERSCAN_API_KEY}`
    );
    if (response.data.status === "1") {
      const PreExistingWalletAddress = await addressModel.findOne({
        walletAddress: walletAddress,
      });
      if (!PreExistingWalletAddress) {
        const newAddress = await addressModel.create({
          walletAddress: walletAddress,
        });
      }

      // Here I am implementing a different approach to store the transaction data
      // The etherscan only returns the last 10k transactions
      // So what if we want the transaction data that was fetch before
      // Also if store the same transaction again and again it will be a be difficult to manage
      // So I am storing the array of transaction as a transaction record in the transaction model
      // And then storing the transaction record id in the address model
      // We can easily manage the transaction data and also we can fetch the transaction data that was fetched before
      //For example if we want to fetch the transaction data of a wallet address that was fetched 1 month ago
      // We can easily fetch it by using the created at and updated at field of the transaction model
      // Also I am using mongoose session to make the transaction atomic
      const transaction = response.data.result;
      const createTransactionsRecords = await transactionModel.create(
        [
          {
            walletAddress: walletAddress,
            transactionArray: transaction,
          },
        ],
        {
          session,
        }
      );
      const updatedWalletData = await addressModel.updateOne(
        {
          walletAddress: walletAddress,
        },
        {
          $push: { transaction: createTransactionsRecords[0]._id },
        },
        { session }
      );

      await session.commitTransaction();
      session.endSession();
    } else {
      await session.abortTransaction();
      session.endSession();
      return res.json({
        message: "No transactions found for this wallet address",
      });
    }
    res.json(response.data.result);
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.log(err);
    res.status(500).json({
      message: "An error occurred while processing the transaction",
      error: err.message,
    });
  }
};

module.exports = fetchTransaction;
