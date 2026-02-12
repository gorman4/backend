//@desc Insert free quotes into database and send alerts(emails)
//@route POST /api/v1/quote

const Quote = require("../models/quotes");

//@access Public
const handleQuotes = async(req, res) => {
    try {
        const {
            flight_type,
            email_address,
            departure_country,
            total_weight,
            recipient_country,
            expected_delivery_date,
            status

        } = req.body;
        //check if values are avaialble
        if (!flight_type ||
            !email_address ||
            !departure_country ||
            !total_weight ||
            !recipient_country ||
            !expected_delivery_date ||
            !status) {
            //return back erro
            return res.status(400).json({
                message: "Invalid value entered, Check value again!"
            })

        }

        //Check if email already exist
        const userExist = await Quote.findOne({ emailaddress: email_address })
        if (userExist) {

            return res.status(400).json({
                message: "Your email already exist in the database."
            })
        }


        const quote = await Quote.create({
            flighttype: flight_type,
            emailaddress: email_address,
            departurecountry: departure_country,
            totalweight: total_weight,
            recipientcountry: recipient_country,
            expecteddeliverydate: expected_delivery_date,
            status

        })


        return res.status(201).json({
            message: "New Quote Added Successfully"
        })



    } catch (err) {


        res.status(400).json({
            message: "Server failed"
        })
    }


}






module.exports = {
    handleQuotes
}