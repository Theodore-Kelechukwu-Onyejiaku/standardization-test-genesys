const express = require("express");
const orderRouter = express.Router();
const orderController = require("../controllers/orderController");
const Order = require("../models/orderModel");
const validation = require("../validation/validateToken");



/**
 *  @route /orders
 *  @descr CRUD /orders routes
 *  @access private
 */ 
orderRouter.route("/")
.get(validation.verifyUser, validation.verifyAdmin, orderController.getAllOrders)
.post(orderController.notAllowed)
.put(orderController.notAllowed)
.delete(validation.verifyUser, validation.verifyAdmin,orderController.deleteAllOrders)


/**
 *  @routes /orders/:order_id
 *  @descr CRUD the routes
 *  @access private
 */
orderRouter.route("/:order_id")
.get(validation.verifyUser, orderController.getSingleOrder)
.post(orderController.notAllowed)
.put(orderController.updateOrder)
.delete(validation.verifyUser, validation.verifyAdmin, orderController.deleteSingleOrder)


module.exports = orderRouter;