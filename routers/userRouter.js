const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController")

userRouter.route("/")
.get(userController.getUsers)
.post()
.put()
.delete()

userRouter.route("/signup")
.get()
.post(userController.singup)
.put()
.delete()

module.exports = userRouter;