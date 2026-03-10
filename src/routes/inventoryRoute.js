const express = require("express");
const { insertInventory, TrackInventory, getUserInventories, activateInventory } = require("../controllers/inventoryController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/inventory", protect, insertInventory)
router.get("/inventory", protect, getUserInventories)
router.post("/track", TrackInventory)
router.patch("/activate", protect, activateInventory);


module.exports = router;