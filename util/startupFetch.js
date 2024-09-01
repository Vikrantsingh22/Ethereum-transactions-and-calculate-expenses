const mongooseConnection = require("./mongoConnection");
const FetchEtherDataAndUpdate = require("../controller/FetchEthereumPrice");

const startupFetch = async () => {
  await mongooseConnection();
  await FetchEtherDataAndUpdate();
};

module.exports = startupFetch;
