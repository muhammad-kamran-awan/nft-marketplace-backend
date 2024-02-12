// controllers/nftController.js

const NFT = require("../models/NFT");

exports.createNFT = async (req, res) => {
  try {
    const nft = new NFT(req.body);
    await nft.save();
    res.status(201).json(nft);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new function to get all categories
exports.getCategories = async (req, res) => {
  try {
    const nfts = await NFT.find();
    const groupedNFTs = nfts.reduce((grouped, nft) => {
      const category = nft.category;
      if (category in grouped) {
        grouped[category].push(nft);
      } else {
        grouped[category] = [nft];
      }
      return grouped;
    }, {});
    const categories = Object.entries(groupedNFTs).map(
      ([categoryName, nfts]) => ({ name: categoryName, nftCount: nfts.length })
    );
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Other controller functions...

exports.getNFTsByCategory = async (req, res) => {
  const { categoryName } = req.params;

  try {
    const nfts = await NFT.find({ category: categoryName });
    res.json(nfts);
  } catch (error) {
    console.error("Error fetching NFTs by category", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getNFTs = async (req, res) => {
  try {
    const nfts = await NFT.find({});
    res.status(200).json(nfts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getNFTByIPFSPath = async (req, res) => {
  try {
    const nft = await NFT.findOne({ ipfsPath: req.params.ipfsPath });
    if (nft) {
      res.status(200).json(nft);
    } else {
      res.status(404).json({ message: "NFT not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
