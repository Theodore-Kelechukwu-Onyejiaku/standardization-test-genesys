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

exports.notAllowed = (req, res, next)=>{
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




/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
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
    .then(dish =>{
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(dish);
    }, (err) => next(err))
    .catch(err => next(err));
}


/***
 *  /foods/food_id/comments
 */

 exports.getComments = (req, res, next)=>{
     Food.findById(req.params.food_id)
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