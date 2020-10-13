const express = require("express");
const dishRouter = express.Router();
const dishController = require("../controllers/dishController");


dishRouter.route("/")
.get(dishController.getDishes)


module.exports = dishRouter;