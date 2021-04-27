const express = require("express");
const OrdersService = require("./orders-service");
const jsonParser = express.json();
const ordersRouter = express.Router();
const path = require("path");
const { requireAuth } = require("../middleware/jwt-auth");
const {colors, phases} = require('../store')




ordersRouter.route("/").post(jsonParser, (req, res, next) => {
  const db = req.app.get("db");
  const { product_id, color, amount, prty_lvl, phase } = req.body;
  if ( !product_id || !color || !amount || !prty_lvl || !phase )
    return res.status(400).json({ error: "Missing required fields" });
  if (!colors.includes(color)) return res.status(400).json({ error: "Inavalid Color" });
  if (!phases.includes(phase)) return res.status(400).json({ error: "Inavalid Phase" });
  const order = { product_id, color, amount, prty_lvl, phase };
  OrdersService.insertOrder(db, order)
    .then((order) =>
      res
        .status(201)
        .location(path.posix.join(req.originalUrl, `/${order.id}`))
        .json(order)
    )
    .catch(next);
})
.get((req, res, next) => {
    OrdersService.getAllOrders(req.app.get("db")).then(orders =>
     res.status.json(orders)
    )
})


ordersRouter
  .route("/:orderId")
  .all(checkOrderExists)
  .get((req, res, next) => {
    return res.status(200).json(res.order);
  })
  .delete(requireAuth, (req, res, next) => {
    const db = req.app.get("db");
    const { id } = res.order;
    ordersService.deleteOrder(db, id)
      .then(() => res.status(204).end())
      .catch(next);
  })
  .patch(requireAuth, jsonParser, (req, res, next) => {
    const db = req.app.get("db");
    const { product_id, color, amount, prty_lvl, phase } = req.body;
    const newInfo = { product_id, color, amount, prty_lvl, phase };
    if ( !product_id && !color && !amount && !prty_lvl && !phase )
      return res
        .status(400)
        .json({ error: "Must update at least one required field" });
    OrdersService.updateOrder(db, res.order.id, newInfo)
      .then((order) => {
        return res.status(200).json(order);
      })
      .catch(next);
  });

async function checkOrderExists(req, res, next) {
  try {
    const orderId = req.params.orderId;
    const db = req.app.get("db");
    const order = await OrdersService.getOrderById(db, orderId);
    if (!order)
      return res.status(400).json({ error: "Order not found" });
    res.order = order;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = ordersRouter;
