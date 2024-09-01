const mongoose = require("mongoose");

const EtherSchema = new mongoose.Schema(
  {
    coinName: {
      type: String,
      required: true,
      unique: true,
    },
    coinPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const EtherPrice = mongoose.model("EtherPrice", EtherSchema);
module.exports = EtherPrice;
