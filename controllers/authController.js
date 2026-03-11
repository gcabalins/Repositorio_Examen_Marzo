const db = require("../database/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

exports.register = (req, res) => {

    const { username, email, password } = req.body;

    const hash = bcrypt.hashSync(password, 10);

    db.run(
        "INSERT INTO users(username,email,password) VALUES(?,?,?)",
        [username, email, hash],
        function (err) {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({ message: "User created" });
        }
    );
};

exports.login = (req, res) => {

    const { email, password } = req.body;

    db.get(
        "SELECT * FROM users WHERE email=?",
        [email],
        (err, user) => {

            if (!user) {
                return res.status(401).json({ error: "User not found" });
            }

            const valid = bcrypt.compareSync(password, user.password);

            if (!valid) {
                return res.status(401).json({ error: "Invalid password" });
            }

            const token = jwt.sign(
                { id: user.id },
                config.jwtSecret,
                { expiresIn: "24h" }
            );

            res.json({ token });
        }
    );
};