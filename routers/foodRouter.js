const express = require("express");
const bodyParser = require("body-parser")
const dishRouter = express.Router();
const dishController = require("../controllers/foodController");

dishRouter.use(bodyParser.json())

dishRouter.route("/")
.get(dishController.getFoods)
.post(dishController.createFood)
.put(dishController.updateAllFoods)
.delete(dishController.deleteAllFoods)

dishRouter


module.exports = dishRouter;