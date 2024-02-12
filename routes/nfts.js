// routes/nfts.js

const express = require("express");
const router = express.Router();
const nftController = require("../controllers/nftController");

router.post("/", nftController.createNFT);
router.get("/", nftController.getNFTs);
//update buyer and seller address

router.get("/ipfs/:ipfsPath", nftController.getNFTByIPFSPath);
router.get("/categories", nftController.getCategories);
router.get("/category/:categoryName", nftController.getNFTsByCategory);

module.exports = router;
