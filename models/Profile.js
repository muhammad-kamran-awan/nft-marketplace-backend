const mongoose = require("mongoose");

const ProfileSchema = mongoose.Schema({
  walletAddress: {
    type: String,
    required: true,
    unique: true,
  },
  username: String,
  description: String,
  email: String,
  facebookLink: String,
  twitterLink: String,
  instagramLink: String,
  websiteLink: String,
  collectionIDs: [String], // New field for collection IDs
  // Add other fields as needed...
});

module.exports = mongoose.model("Profile", ProfileSchema);
