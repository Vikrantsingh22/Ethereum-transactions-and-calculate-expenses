const mongooseConnection = require("./mongoConnection");

const startupFetch = async () => {
  await mongooseConnection();
};

module.exports = startupFetch;
