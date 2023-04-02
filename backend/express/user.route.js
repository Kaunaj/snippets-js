"use strict";
const express = require("express");
const router = express.Router();

const users = {
    123: {
        name: "Marcus Brutus",
        age: 24,
        class: "Goliath",
        weapons: ["greataxe", "warhammer", "longsword"]
    },
    234: {
        name: "Fran",
        age: 32,
        class: "Wizard",
        weapons: ["wand", "dagger", "quarterstaff"]
    }
};

router.get("/:userid", getUserByIdHandler2);

function getUserByIdHandler1(req, res, next) {
    console.log("getUserByIdHandler1 called", req.params);
    let userResp = {
        status: 0,
        data: null,
        message: ""
    };
    try {
        let userid = req.params.userid.trim();
        if (!userid) {
            userResp.status = 400;
            userResp.message = "User ID is required";
        } else {
            userid = Number(userid);
            if (!Number.isInteger(userid)) {
                userResp.status = 400;
                userResp.message = "User ID must be a number";
            } else if (!users[userid]) {
                userResp.status = 404;
                userResp.message = "Not found";
            } else {
                userResp.data = users[userid];
                userResp.status = 200;
                userResp.message = "Found";
            }
        }
    } catch (e) {
        console.log("getUserByIdHandler error", e);
        userResp.status = 500;
        userResp.message = e.message;
    } finally {
        console.log("userResp", userResp);
        res.status(userResp.status).send({ message: userResp.message, data: userResp.data });
        return next();
    }
}

function getUserByIdHandler2(req, res, next) {
    try {
        let userid = req.params.userid.trim();
        if (!userid) {
            res.status(400).send({ message: "User ID is required", data: null });
            return next();
        }
        userid = Number(userid);
        if (!Number.isInteger(userid)) {
            res.status(400).send({ message: "User ID must be a positive integer", data: null });
            return next();
        }
        if (!users[userid]) {
            res.status(404).send({ message: "Not found", data: null });
            return next();
        }
        res.status(200).send({ message: "Found", data: users[userid] });
        return next();
    } catch (e) {
        console.log("getUserByIdHandler error", e);
        res.status(500).send({ message: e.message, data: e });
        return next();
    }
}

module.exports = router;
