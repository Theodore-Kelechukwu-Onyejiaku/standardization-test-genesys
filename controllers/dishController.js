const mongoose = require("mongoose");
const Dish = require("../models/dishModel");


//GET REQUESTS
exports.getDishes = (req, res, next)=>{
    Dish.find()
    .then()
    console.log("Hello controller is running")
    next()
}

exports.getDishCategory = (req, res, next)=>{
    
}