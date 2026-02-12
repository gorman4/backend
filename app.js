require("dotenv").config();
const cors = require("cors");
const path = require("path");
const fs = require("fs")
const express = require("express");
const connectDB = require("./src/config/DB");
const authRoute = require("./src/routes/authRoute")
const quoteRoute = require("./src/routes/quoteRoute")
const inventoryRoute = require("./src/routes/inventoryRoute");

connectDB(); // make database connect


/*------------------CONSTANTS---------------------------------*/
const PORT = 8000 // For default systems


const app = express()

/*****************MiddleWares************************************* */
app.use(express.json())



//Routes
app.use("/api/v1", authRoute)
app.use("/api/v1", quoteRoute)
app.use("/api/v1", inventoryRoute)



app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`)
})