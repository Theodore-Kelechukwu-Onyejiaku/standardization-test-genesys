const express = require("express");
const bodyParser = require("body-parser")
const foodRouter = express.Router();
const foodController = require("../controllers/foodController");

foodRouter.use(bodyParser.json())

/**
 *      /foods
 */
foodRouter.route("/")
.get(foodController.getFoods)
.post(foodController.createFood)
.put(foodController.notAllowed)
.delete(foodController.deleteAllFoods)




/**
 *       For Single Food
 *      /foods/<food_id>
 */
foodRouter.route("/:food_id")
.get(foodController.getSingleFood)
.post(foodController.notAllowed)
.put(foodController.updateSingleFood)
.delete(foodController.deleteSingleFood)



/**
 *      for comments
 */
foodRouter.route("/:food_id/comments")
.get(foodController.getComments)
.post(foodController.createComment)
.put(foodController.notAllowed)
.delete(foodController.deleteComments)


/**
 *  for Single Comments
 */
foodRouter.route("/:food_id/comments/:comment_id")
.get(foodController.getSingleComment)
.post(foodController.notAllowed)
.put(foodController.updateSingleComment)
.delete(foodController.deleteSingleComment)


module.exports = foodRouter;