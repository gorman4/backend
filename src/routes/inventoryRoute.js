const express = require("express");
const { insertInventory, TrackInventory, getUserInventories } = require("../controllers/inventoryController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/inventory", protect, insertInventory)
router.get("/inventory", protect, getUserInventories)
router.post("/track", TrackInventory)



module.exports = router;