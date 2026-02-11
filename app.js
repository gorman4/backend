const express = require("express");


/*------------------CONSTANTS---------------------------------*/
const PORT = 8000 // For default systems


const app = express()

/*****************MiddleWares************************************* */
app.use(express.json())


app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`)
})