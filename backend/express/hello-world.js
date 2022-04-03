/* DEPENDENCIES */
const path = require("path");
const express = require("express");

const ENV = process.argv[2] || process.env.NODE_ENV || "dev";
if (ENV === "production") {
    require("dotenv").config();
} else {
    require("dotenv").config({ path: path.join(__dirname, ".env-dev") });
}

/* APP INITIALIZATIONS */
const app = express();
const port = process.env.PORT || 3000;
const ipaddress = process.env.IP || "127.0.0.1";

app.get("/", onRootHandler, logger);

const server = app.listen(port, ipaddress, () => {
    console.log(`Server started on ${ipaddress}:${port}`);
});

/* FUNCTIONS */
function onRootHandler(req, res, next) {
    res.status(200).send("Hello world");
    next();
}

function logger(req, res, next) {
    console.log(`[ ${new Date().toLocaleString()} ] ${req.method} ${res.statusCode} ${req.url}`);
    next();
}
