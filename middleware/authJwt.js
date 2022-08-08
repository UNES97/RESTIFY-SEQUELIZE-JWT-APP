const jwt   = require("jsonwebtoken");
const config= require("../config/auth.config.js");
const db    = require("../models");

const User = db.user;
verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
        res.status(403);
        return res.send({
            message: "No TOKEN provided!"
        });
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
        res.status(401);
        return res.send({
            message: "Unauthorized!"
        });
        }
        req.userId = decoded.id;
        next();
    });
};

isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "Admin") {
                    next();
                    return;
                }
            }
            res.status(403);
            res.send({
                message: "Require Admin Role!"
            });
            return;
        });
    });
};


isSuperAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "Super Admin") {
                    next();
                    return;
                }
            }
            res.status(403);
            res.send({
                message: "Require Super Admin Role!"
            });
        });
    });
};

isSuperOrAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "Super Admin") {
                    next();
                    return;
                }
                if (roles[i].name === "Admin") {
                    next();
                    return;
                }
            }
            res.status(403);
            res.send({
                message: "Require Super Admin or Admin Role!"
            });
        });
    });
};

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isSuperAdmin: isSuperAdmin,
    isSuperOrAdmin: isSuperOrAdmin
};
module.exports = authJwt;
