const mongoose = require("mongoose");

const connectdb = async (req, res) => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "cryptoProject",
    });
    console.log("database connected");
  } catch (err) {
    const error = {
      statusCode: 500,
      message: "Error while connecting the database",
    };
    console.log(error);
  }
};

module.exports = connectdb;
