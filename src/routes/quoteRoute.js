const express = require("express")
const { handleQuotes } = require("../controllers/quoteController")

const router = express.Router()

//Declaring the end points
router.post("/quote", handleQuotes)

module.exports = router;