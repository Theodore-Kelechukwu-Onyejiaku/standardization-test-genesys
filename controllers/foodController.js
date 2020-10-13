const mongoose = require("mongoose");
const Food = require("../models/foodModel");


/** ALL REQUESTS TO /foods
 * @param {/} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getFoods = (req, res, next)=>{
    Food.find()
    .then((food) =>{
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(food);
    }, err => next(err))
    .catch(err => next(err))
}

exports.createFood = (req, res, next)=>{
    Food.create(req.body)
    .then((food) =>{
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(food);
    }, err => next(err))
    .catch(err => next(err))
}

exports.updateAllFoods = (req, res, next)=>{
    res.statusCode = 403;
    res.end("PUT operation not supported on /foods");
}

exports.deleteAllFoods = (req, res, next)=>{
    Food.remove({})
    .then(response =>{
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(response);
    }, (err)=> next(err))
    .catch(err => next(err));
}

exports.getFoodCategory = (req, res, next)=>{
    Food.findOne({"category": req.body.category})
}