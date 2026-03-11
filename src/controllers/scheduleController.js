const { startMovementCron, stopMovementCron } = require("../services/movementCron");



const startMove = async(req, res) => {
    const { trackNo } = req.body;
    if (!trackNo) {
        return res.status(400).json({
            message: "Tracking number is invalid",
        });
    }
    console.log("before calling movement")
    startMovementCron(trackNo);
    console.log("after making movement")

    res.json({
        success: true,
        message: "Movement cron started"
    });
}

const stopMove = (req, res) => {

    stopMovementCron();

    res.json({
        success: true,
        message: "Movement cron stopped"
    });
}

module.exports = {
    startMove,
    stopMove

}