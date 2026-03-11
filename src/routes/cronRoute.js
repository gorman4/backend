const express = require("express");
const { startMove, stopMove } = require("../controllers/ScheduleController");
const protect = require("../middleware/authMiddleware");


const router = express.Router();


router.post("/startmove", protect, startMove);
router.post("/stopmove", protect, stopMove);

module.exports = router;