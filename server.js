const express = require("express");
const cors = require("cors");
const path = require("path");
const config = require("./config/config");

const authRoutes = require("./routes/authRoutes");
const weatherRoutes = require("./routes/weatherRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views/login.html"));
});

app.get("/dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "views/dashboard.html"));
});

app.use("/api/auth", authRoutes);
app.use("/api/weather", weatherRoutes);

app.listen(config.port, () => {
    console.log("Server running on port " + config.port);
});