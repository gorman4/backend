const { v4: uuidv4 } = require("uuid")
const Inventory = require("../models/inventory")
const getCoordinates = require("../services/getCoordinates")
const generateTrackNo = require("../lib/generateTrackNo")

const insertInventory = async(req, res) => {
    try {
        //get values and validate
        const {
            item_name,
            quantity,
            origin,
            destination,
            current_position,
            location

        } = req.body

        if (!item_name ||
            !quantity ||
            !origin ||
            !destination ||
            !current_position ||
            !location.name
        ) {
            return res.status(400).json({
                message: "Please enter all values"
            })
        }
        //Create unique ID
        const uniqueID = uuidv4();

        //Generate tracking number
        const trackNo = generateTrackNo(uniqueID)


        // Get longitude and latitude from location name
        const { lon, lat } = await getCoordinates(location.name);


        // write to database
        const inventory = await Inventory.create({
            uuid: uniqueID,
            itemname: item_name,
            quantity,
            tracknumber: trackNo,
            origin,
            destination,
            currentposition: current_position,
            location: {
                name: location.name,
                long: lon,
                lat: lat,
            },
        })



        return res.status(201).json({
            inventory,
            message: "Inventory insert successfully"
        })

    } catch (err) {
        return res.status(500).json({
            message: "Internal server error"
        })

    }



}

const TrackInventory = async(req, res) => {
    try {
        const { trackNumber } = req.body;
        if (!trackNumber) {

            return res.status(400).json({
                message: "Tracking number is invalid"
            })
        }

        const inventory = await Inventory.findOne({ tracknumber: trackNumber })
        if (!inventory) {

            return res.status(401).json({
                message: "Invalid INventory"
            })
        }

        return res.status(200).json({
            inventory,
            message: "Successfully retrieved"
        })


    } catch (err) {

        return res.status(500).json({
            message: "Internal server error"
        })
    }



}



module.exports = {
    insertInventory,
    TrackInventory
}