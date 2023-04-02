"use strict";
/* DEPENDENCIES */
const path = require("path");
const express = require("express");

const ENV = process.argv[2] || process.env.NODE_ENV || "dev";
if (ENV === "production") {
    require("dotenv").config();
} else {
    require("dotenv").config({ path: path.join(__dirname, ".env-dev") });
}

const userRouter = require("./user.route");

/* APP INITIALIZATIONS */
const app = express();
const port = process.env.PORT || 3000;
const ipaddress = process.env.IP || "127.0.0.1";

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use("/api/users", userRouter, logger);

app.get("/", onRootHandler, logger);

const server = app.listen(port, ipaddress, () => {
    console.log(`Server started on ${ipaddress}:${port}`);
});

/* FUNCTIONS */
function onRootHandler(req, res, next) {
    res.status(200).send("Hello world");
    return next();
}

function logger(req, res, next) {
    console.log("logger called");
    console.log(`[ ${new Date().toLocaleString()} ] ${req.method} ${req.protocol}://${req.hostname}${req.originalUrl}`);
    return next();
}
