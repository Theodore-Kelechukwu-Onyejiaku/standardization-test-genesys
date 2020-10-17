const mongoose = require("mongoose");
const Food = require("../models/foodModel");
const User = require("../models/userModel");
const Order = require("../models/orderModel");

 
/**
 * 
 * @route POST /foods
 * @descr CRUD all /foods
 * @access public and private
 */

exports.getFoods = (req, res, next)=>{
    Food.find()
    .populate("comments.user")
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

exports.notAllowed = (req, res, next)=>{
    res.statusCode = 403;
    res.end("Operation not supported");
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




/**
 * 
 * @route  req /foods/food_id
 * @descr {*} res 
 * @access {*} next 
 */

 exports.getSingleFood = (req, res, next)=>{
     Food.findById(req.params.food_id)
     .then((food) =>{
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(food);
    }, err => next(err))
    .catch(err => next(err))
 }

 exports.updateSingleFood = (req, res, next)=>{
     Food.findByIdAndUpdate(req.parmas.food_id, {$set : req.body}, {new:true})
     .then(food =>{
        console.log("Food Updated", food);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(food);
    }, (err) => next(err))
    .catch(err => next(err));
 }

exports.deleteSingleFood = (req, res, next)=>{
    Food.findByIdAndRemove(req.param.food_id)
    .then(food =>{
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(food);
    }, (err) => next(err))
    .catch(err => next(err));
}


/***
 *  /foods/food_id/comments
 */

 exports.getComments = (req, res, next)=>{
     Food.findById(req.params.food_id)
     .populate("comments.user")
     .then(food =>{
        res.statusCode =200;
        res.setHeader("Content-Type", "application/json");
        res.json(food.comments)
     }, err => next(err))
     .catch(err => next(err))
 }

 exports.createComment = (req, res, next)=>{
     Food.findById(req.params.food_id)
     .then(food =>{
         req.body.user = req.user._id;
         food.comments.push(req.body);
         food.save()
         .then(foodComment =>{
            res.statusCode =200;
            res.setHeader("Content-Type", "application/json");
            res.json(food)
         }, err => next(err))
         .catch(err => next(err))
     })
 }

 exports.deleteComments = (req, res, next)=>{
     Food.findById(req.params.food_id)
     .then(food  =>{
         //To remove every comment 
         if(food.comments.length > 0){
            for(let index = 0; index >= 0; index--){
                food.comments.splice(index, 1)
            }
         }
         
         food.save()
         .then(food=>{
             res.statusCode = 200;
             res.setHeader("Cotent-Type","application/json");
             res.json(food)
         }, err => next(err))
     })
     .catch(err => next(err))
 }


 /**
  *  @route /foods/:food_id/comments/:comment_id
  *     FOR SINGLE COMMENTS
  */
exports.getSingleComment = (req, res, next) =>{
    Food.findById(req.params.food_id)
    .then(food =>{
        res.statusCode = 200;
        res.setHeader("Content-type", "application/json")
        res.json(food.comments.id(req.params.comment_id))
    }, err => next(err))
    .catch(err => next(err))
}

exports.updateSingleComment = (req, res, next) =>{
    Food.findById(req.params.food_id)
    .then(food =>{
        let userId = req.user._id;
        let commentId = food.comments.id(req.params.comment_id).user;
        console.log(userId, commentId)

        if(!(userId == commentId)){
            console.log("This is not the user!")
            var err = new Error("You are not allowed to update a comment that is not yours!")
            err.statusCode = 403;

            return next(err)
        }
        if(req.body.rating){
            food.comments.id(req.params.comment_id).rating = req.body.rating;
        }
        if(req.body.comment){
            food.comments.id(req.params.comment_id).comment = req.body.comment
        }
        food.save()
        .then(food =>{
            res.statusCode = 200;
            res.setHeader("Content-type", "application/json")
            res.json(food.comments.id(req.params.comment_id))
        }, err => next(err))
    }, err => next(err))
    .catch(err => next(err))
}

exports.deleteSingleComment = (req, res, next)=>{
    Food.findById(req.params.food_id)
    .then(food =>{
        let userId = req.user._id;
        let commentId = food.comments.id(req.params.comment_id).user;
        console.log(userId, commentId)

        if(!(userId == commentId)){
            console.log("This is not the user!")
            var err = new Error("You are not allowed to delete a comment that is not yours!")
            err.statusCode = 403;

            return next(err)
        }
        food.comments.id(req.params.comment_id).remove()
        food.save()
        .then(newFoodInfo => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(newFoodInfo.comments)
        }, err => next(err))
    }, err => next(err))
    .catch(err => next(err))
}


/**
 *      FOR ORDERS
 */
exports.orderFood = (req, res, next)=>{
    req.body.user = req.user._id;
    req.body.food = req.params.food_id;
    //Food.findById(req.params.food_id)
    Order.create(req.body)
    .then(order =>{
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(order)
    }, err => next(err))
    .catch(err => next(err))
}