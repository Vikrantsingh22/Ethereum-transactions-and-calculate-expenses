const { default: axios } = require("axios");
const EtherModel = require("../models/EtherPrice");
const cron = require("node-cron");
const fetchEthereumPrice = async (req, res) => {
  try {
    // This will check if the ethereum data is already present in the database
    // If not then it will create the ethereum data with the price of 1000 and then update the price

    const PreExistingEtherData = await EtherModel.findOne({
      coinName: "Ethereum",
    });
    if (!PreExistingEtherData) {
      await EtherModel.create({ coinName: "Ethereum", coinPrice: "1000" });
    }
    await CoinGeckoRequestAndUpdate();
    // This will update the price of ethereum every 10 minutes
    cron.schedule("*/10 * * * *", async () => {
      await CoinGeckoRequestAndUpdate();
    });
  } catch (error) {}
};

const CoinGeckoRequestAndUpdate = async (req, res) => {
  const response = await axios.get(
    `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr`
  );
  if (response.status === 200) {
    const updatedPrice = await EtherModel.updateOne(
      { coinName: "Ethereum" },
      { coinPrice: response.data.ethereum.inr }
    );
  }
};
module.exports = fetchEthereumPrice;
