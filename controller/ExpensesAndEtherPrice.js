const addressModel = require("../models/address");
const EtherModel = require("../models/EtherPrice");

const CalculateExpensesAndEtherPrice = async (req, res) => {
  try {
    const EtherPrice = await EtherModel.findOne({ coinName: "Ethereum" });
    const EtherPriceValueInINR = EtherPrice.coinPrice;
    const WalletAddress = req.body.walletAddress;
    const WalletData = await addressModel
      .findOne({ walletAddress: WalletAddress })
      .populate("transaction");
    const TransactionArray = WalletData.transaction;
    let totalEtherSpent = 0;
    //optional here we are obtaining recent trasaction that is fetched for this wallet address
    // Here if needed we can find the transaction for any specific date range
    // The reason I did was that etherscan api has limit to fetch only 10000 transactions
    //So if the transactions are more than 10000 or we fetch the same transaction again and again it does not make this
    // efficient there I saved the array of of transaction as document and every time the wallet address is used to make
    // the request to fetch the transaction I use the same procedure

    const mostRecentTransactionsFetched =
      TransactionArray[TransactionArray.length - 1].transactionArray;
    for (let i = 0; i < mostRecentTransactionsFetched.length; i++) {
      const etherSpent =
        (mostRecentTransactionsFetched[i].gasUsed *
          mostRecentTransactionsFetched[i].gasPrice) /
        Math.pow(10, 18);
      totalEtherSpent += etherSpent;
    }
    console.log(totalEtherSpent);
    console.log(EtherPriceValueInINR);
    res.json({
      totalEtherSpent: totalEtherSpent,
      EtherPriceValueInINR: EtherPriceValueInINR,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = CalculateExpensesAndEtherPrice;
