const User = require("../models/userModel");

exports.getUsers = (req, res, next)=>{
    User.find()
    .then(users =>{
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(users)
    }, err => next(err))
    .catch(err => next(err))
}