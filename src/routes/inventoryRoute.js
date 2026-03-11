const express = require("express");
const { insertInventory, TrackInventory, getUserInventories, activateInventory, updateLocation } = require("../controllers/inventoryController");
const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const router = express.Router();

router.post("/inventory", upload.single("item_image"), protect, insertInventory)
router.get("/inventory", protect, getUserInventories)
router.post("/track", TrackInventory)
router.patch("/activate", protect, activateInventory);
router.patch("/update", protect, updateLocation)


module.exports = router;