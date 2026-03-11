const { v4: uuidv4 } = require("uuid");
const Inventory = require("../models/inventory");
const getCoordinates = require("../services/getCoordinates");
const generateTrackNo = require("../lib/generateTrackNo");
const inventory = require("../models/inventory");

const insertInventory = async(req, res) => {
    try {
        //get values and validate
        const {
            item_name,
            quantity,
            origin,
            destination,
            current_position,
            location,
            status,
            receiver_name,
            receiver_address,
            receiver_email,
            receiver_phone,
            weight,
            service,
            delivery_mode,
            completion,
            expected_delivery,
        } = req.body;



        const item_image = req.file ? req.file.filename : null;

        if (!item_name ||
            !quantity ||
            !origin ||
            !destination ||
            !current_position ||
            !location ||
            !receiver_name ||
            !receiver_address ||
            !receiver_email ||
            !receiver_phone ||
            !weight ||
            !service ||
            !delivery_mode ||
            !completion ||
            !expected_delivery ||
            !item_image
        ) {
            return res.status(400).json({
                message: "Please enter all values",
            });
        }
        //Create unique ID
        const uniqueID = uuidv4();

        //Generate tracking number
        const trackNo = generateTrackNo(uniqueID);


        // Get longitude and latitude from location name
        const { lon, lat } = await getCoordinates(location);

        // write to database
        const inventory = await Inventory.create({
            user: req.user._id,
            uuid: uniqueID,
            receivername: receiver_name,
            receiveraddress: receiver_address,
            receiveremail: receiver_email,
            receiverphone: receiver_phone,
            weight,
            service,
            deliverymode: delivery_mode,
            completion,
            expecteddelivery: expected_delivery,
            itemimage: item_image,
            itemname: item_name,
            quantity,
            tracknumber: trackNo,
            origin,
            destination,
            currentposition: current_position,
            location: {
                name: location,
                long: lon,
                lat: lat,
                // isMoving: false,
                // direction: "",
            },
            status,
        });

        return res.status(201).json({
            success: true,
            inventory,
            message: "Inventory insert successfully",
        });
    } catch (err) {
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

const TrackInventory = async(req, res) => {
    try {
        const { trackNumber } = req.body;

        if (!trackNumber) {
            return res.status(400).json({
                message: "Tracking number is invalid",
            });
        }

        const inventory = await Inventory.findOne({ tracknumber: trackNumber });

        if (!inventory) {
            return res.status(404).json({
                message: "Invalid Tracking Number",
            });
        }

        // Check inventory status
        if (inventory.status !== "Active") {
            return res.status(403).json({
                message: "This tracking number is not active",
            });
        }

        return res.status(200).json({
            inventory,
            message: "Successfully retrieved",
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
};

const getUserInventories = async(req, res) => {
    try {
        //get logged in user id from middle
        const userId = req.user._id;
        const inventories = await inventory.find({ user: userId });

        res.status(200).json({
            success: true,
            count: inventories.length,
            data: inventories,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
};

const activateInventory = async(req, res) => {
    //Get the present status and reverse it
    try {
        const { uuid } = req.query;

        if (!uuid) {
            return res.status(400).json({
                success: false,
                message: "UUID is required",
            });
        }

        const updatedInventory = await Inventory.findOneAndUpdate({ uuid: uuid }, { status: "Active" }, { new: true }, );
        if (!updatedInventory) {
            return res.status(404).json({
                success: false,
                message: "Inventory not found",
            });
        }
        return res.status(200).json({
            success: true,
            data: updatedInventory,
        });
    } catch (error) {
        console.error("Activation error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};


const updateLocation = async(req, res) => {
    try {
        const { trackNo, currentLocation } = req.body;

        // Validate input
        if (!trackNo || !currentLocation) {
            return res.status(400).json({
                success: false,
                message: "Track number and current location are required",
            });
        }

        // Get longitude and latitude from location name
        const { lon, lat } = await getCoordinates(currentLocation);

        // Update inventory
        const updatedInventory = await Inventory.findOneAndUpdate({ tracknumber: trackNo }, {
                $set: {
                    currentposition: currentLocation,
                    location: {
                        name: currentLocation,
                        long: lon,
                        lat: lat,
                    },
                },
            }, { new: true } // return updated document
        );

        if (!updatedInventory) {
            return res.status(404).json({
                success: false,
                message: "Inventory not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Inventory location updated successfully",
            data: updatedInventory,
        });

    } catch (error) {
        console.error("Update Inventory Error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

module.exports = {
    insertInventory,
    TrackInventory,
    getUserInventories,
    activateInventory,
    updateLocation
};