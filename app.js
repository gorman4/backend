require("dotenv").config();
const cors = require("cors");
const path = require("path");
// const fs = require("fs")
const express = require("express");
const connectDB = require("./src/config/DB");
const authRoute = require("./src/routes/authRoute")
const quoteRoute = require("./src/routes/quoteRoute")
const inventoryRoute = require("./src/routes/inventoryRoute");
const cronRoute = require("./src/routes/cronRoute")


connectDB(); // make database connect


/*------------------CONSTANTS---------------------------------*/
const PORT = 8000 // For default systems


const app = express()

/*****************MiddleWares************************************* */
app.use(express.json())
app.use(cors({
    origin: process.env.CLIENT_URL || "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));




app.use("/uploads", express.static(path.join(__dirname, "src/uploads")));



//Routes
app.use("/api/v1", authRoute)
app.use("/api/v1", quoteRoute)
app.use("/api/v1", inventoryRoute)
    // app.use("/api/v1", cronRoute)



app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`)
})