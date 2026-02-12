const jwt = require("jsonwebtoken")
const User = require("../models/user")

const protect = async(req, res, next) => {
    let token;
    // check authorization header
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //attach user to request (without password)
            req.user = await User.findById(decoded.id).select("-password");

            next(); // allow acess
        } catch (error) {
            return res.status(401).json({
                message: "Not authorized"
            })
        }
    }

    if (!token) {
        return res.status(401).json({
            message: "No token, not authorized"
        })
    }

}

module.exports = protect;