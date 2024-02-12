const Collection = require("../models/Collection");
const Profile = require("../models/Profile");

exports.getProfile = async (req, res) => {
  const profile = await Profile.findOne({
    walletAddress: req.params.walletAddress,
  });

  // If profile doesn't exist, return 404
  if (!profile) {
    return res.status(404).send("Profile not found");
  }
  res.send(profile);
};


//get collections by wallet address of user
exports.getUserCollections = async (req, res) => {
  try {
    const profile = await Profile.findOne({ walletAddress: req.params.walletAddress });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    const collections = await Collection.find({ _id: { $in: profile.collectionIDs } });
    
    res.json(collections);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



exports.createProfile = async (req, res) => {
  let profile = new Profile(req.body);
  profile = await profile.save();

  res.send(profile);
};

exports.updateProfile = async (req, res) => {
  const profile = await Profile.findOneAndUpdate(
    { walletAddress: req.params.walletAddress },
    req.body,
    { new: true }
  );
  res.send(profile);
};

// A new function to add a collectionID to a user's profile
exports.addCollectionToProfile = async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate(
      { walletAddress: req.params.walletAddress },
      { $push: { collectionIDs: req.body.collectionID } },
      { new: true } // This option returns the updated document
    );
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
