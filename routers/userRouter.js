const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController")
const verification = require("../validation/validateToken")


userRouter.get("/",verification.verifyUser, verification.verifyAdmin, userController.getUsers);

userRouter.post("/signup", userController.singup)

userRouter.post("/signin", userController.signin)

userRouter.get("/logout", userController.logout)

userRouter.get("/my_orders", verification.verifyUser, userController.getMyOrders)

module.exports = userRouter;