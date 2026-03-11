const jwt = require("jsonwebtoken");
const config = require("../config/config");

module.exports = function (req, res, next) {

    const token = req.headers["authorization"];

    if (!token) {
        return res.status(403).json({ error: "No token" });
    }

    try {

        const decoded = jwt.verify(token, config.jwtSecret);
        req.user = decoded;

        next();

    } catch {

        res.status(401).json({ error: "Invalid token" });
    }
};