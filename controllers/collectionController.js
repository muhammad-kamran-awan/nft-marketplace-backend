const Collection = require("../models/Collection");
const NFT = require("../models/NFT");

exports.getCollection = async (req, res) => {
  const collection = await Collection.findOne({ name: req.params.name });
  // If collection doesn't exist, return 404
  if (!collection) {
    return res.status(404).send("Collection not found");
  }

  res.send(collection);
};


//get nfts by collection
exports.getCollectionNfts = async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.collectionId);
    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }

    // Instead of matching by _id, match by ipfsPath
    const nfts = await NFT.find({ ipfsPath: { $in: collection.nftIDs } });
    res.json(nfts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// A new function to get a user's collections
exports.getCollectionsByWallet = async (req, res) => {
  try {
    const collections = await Collection.find({
      walletAddress: req.query.walletAddress,
    });
    res.status(200).json(collections);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.createCollection = async (req, res) => {
  let collection = new Collection(req.body);
  collection = await collection.save();

  res.send(collection);
};

exports.updateCollection = async (req, res) => {
  const collection = await Collection.findOneAndUpdate(
    { name: req.params.name },
    req.body,
    { new: true }
  );
  res.send(collection);
};

//get all collections
exports.getAllCollections = async (req, res) => {
  try {
    const collections = await Collection.find();
    res.status(200).json(collections);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}
