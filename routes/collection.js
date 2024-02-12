const express = require("express");
const router = express.Router();

const CollectionController = require("../controllers/collectionController");

router.get("/all", CollectionController.getAllCollections);
//get nfts by collection
router.get("/:collectionId/nfts", CollectionController.getCollectionNfts);
router.get("/:name", CollectionController.getCollection);
router.post("/", CollectionController.createCollection);
router.put("/:name", CollectionController.updateCollection);
router.get("/", CollectionController.getCollectionsByWallet);

module.exports = router;
