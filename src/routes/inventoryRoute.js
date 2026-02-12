const express = require("express");
const { insertInventory, TrackInventory } = require("../controllers/inventoryController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/inventory", protect, insertInventory)
router.post("/track", TrackInventory)



module.exports = router;