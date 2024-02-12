const express = require("express");
const router = express.Router();

const ProfileController = require("../controllers/profileController");

router.get("/:walletAddress", ProfileController.getProfile);
router.get("/:walletAddress/collections", ProfileController.getUserCollections);
router.post("/", ProfileController.createProfile);
router.put("/:walletAddress", ProfileController.updateProfile);
router.post(
  "/:walletAddress/collections",
  ProfileController.addCollectionToProfile
);

module.exports = router;
