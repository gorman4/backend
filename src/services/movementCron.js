const cron = require("node-cron");
const inventory = require("../models/inventory");
const moveLocation = require("./movementService");
const { getLocationName } = require("./getLocationName");

function startMovementCron(tracknumber) {
    let movementJob;

    // if (movementJob) {
    //     console.log("Movement cron already running");
    //     return;
    // }

    movementJob = cron.schedule("*/10 * * * * *", async() => {

        console.log("Running movement simulation for:", tracknumber);

        try {

            const item = await inventory.findOne({ tracknumber });

            if (!item) {
                console.log("Parcel not found");
                return;
            }

            const { lat, lng, direction } = item;

            // move 10km
            const newPosition = moveLocation(lat, lng, direction, 10);

            // get location name
            const newLocationName = await getLocationName(
                newPosition.lat,
                newPosition.lng
            );

            console.log("the new location name is : " + newLocationName)

            await inventory.findOneAndUpdate({ tracknumber }, {
                currentposition: newLocationName,
                location: {
                    name: newLocationName,
                    lat: newPosition.lat,
                    lng: newPosition.lng
                }
            });

            console.log(`Parcel ${tracknumber} moved to ${newLocationName}`);

        } catch (error) {
            console.error("Movement cron error:", error);
        }

    });

    console.log(`Movement cron started for ${tracknumber}`);
}

module.exports = { startMovementCron };