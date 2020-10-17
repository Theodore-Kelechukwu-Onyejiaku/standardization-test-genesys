const express = require("express");
const bodyParser = require("body-parser")
const foodRouter = express.Router();
const foodController = require("../controllers/foodController");
const validation = require("../validation/validateToken");

foodRouter.use(bodyParser.json())

/**
 *      /foods
 */
foodRouter.route("/")
.get(foodController.getFoods)
.post(validation.verifyUser, foodController.createFood)
.put(foodController.notAllowed)
.delete(validation.verifyUser, validation.verifyAdmin, foodController.deleteAllFoods)



/**
 * @route  /foods/<food_id>
 * @descr   For Single Food
 * @access public and private   
 */
foodRouter.route("/:food_id")
.get(foodController.getSingleFood)
.post(foodController.notAllowed)
.put(validation.verifyUser, validation.verifyAdmin, foodController.updateSingleFood)
.delete(validation.verifyUser, validation.verifyAdmin, foodController.deleteSingleFood)


/**
 *  @route /foods/<food_id>/order
 *  @descr for ordering food
 *  @access private
 * 
*/
foodRouter.route("/:food_id/order")
.get()
.post(validation.verifyUser, foodController.orderFood)
.put()
.delete()




/**
 *      for comments
 */
foodRouter.route("/:food_id/comments")
.get(foodController.getComments)
.post(validation.verifyUser, foodController.createComment)
.put(foodController.notAllowed)
.delete(validation.verifyUser, validation.verifyAdmin, foodController.deleteComments)


/**
 *  for Single Comments
 */
foodRouter.route("/:food_id/comments/:comment_id")
.get(foodController.getSingleComment)
.post(foodController.notAllowed)
.put(validation.verifyUser, foodController.updateSingleComment)
.delete(validation.verifyUser, validation.verifyAdmin, foodController.deleteSingleComment)


module.exports = foodRouter;