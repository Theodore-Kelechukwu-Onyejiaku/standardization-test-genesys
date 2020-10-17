const Order = require("../models/orderModel");
const Food = require("../models/foodModel")

exports.notAllowed = (req, res, next)=>{
    res.statusCode = 403;
    res.end("Operation not supported");
}

exports.getAllOrders = (req, res, next)=>{
    Order.find()
    .populate("user")
    .then(order =>{
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(order)
    }, err => next(err))
    .catch(err => next(err))
}

exports.deleteAllOrders = (req, res, next)=>{
    Order.remove({})
    .then(response =>{
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(response)
    }, err => next(err))
    .catch(err => next(err))
}

exports.getSingleOrder = (req, res, next)=>{
    Order.findById(req.params.order_id)
    .populate("user")
    .then(order =>{
        Food.findById(order.food)
        .then(food =>{
            res.statusCode = 200;
            res.setHeader("Conten-Type", "application/json");
            res.json({order, food})
        }, err => next(err))  
    }, err => next(err))
    .catch(err => next(err))
}

exports.updateOrder = (req, res, next)=>{
    Order.findByIdAndUpdate({_id: req.params.order_id}, {$set: req.body}, {new:true})
    .then(food =>{
        console.log("Food Ordered Updtated!", food);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(food);
    }, (err) => next(err))
    .catch(err => next(err));
}

exports.deleteSingleOrder = (req, res, next)=>{
    Order.findByIdAndRemove(req.param.food_id)
    .then(food =>{
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(food);
    }, (err) => next(err))
    .catch(err => next(err));
}