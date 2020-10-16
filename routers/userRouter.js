const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController")
const verification = require("../validation/validateToken")


userRouter.route("/")
.get( verification.verifyUser, userController.getUsers)
.post()
.put()
.delete()

userRouter.route("/signup")
.get()
.post(userController.singup)
.put()
.delete()

userRouter.route("/signin")
.get()
.post(userController.signin)
.put()
.delete()

module.exports = userRouter;