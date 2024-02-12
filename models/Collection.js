const mongoose = require("mongoose");

const CollectionSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
  nftIDs: [String], // array of NFT IDs
  walletAddress: String, // New field for wallet address
});

module.exports = mongoose.model("Collection", CollectionSchema);
