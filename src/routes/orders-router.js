const express = require("express");
const OrdersService = require("../services/orders-service");
const jsonParser = express.json();
const ordersRouter = express.Router();
const path = require("path");
const { requireAuth } = require("../middleware/jwt-auth");
const { colors, phases } = require("../store");

ordersRouter
  .route("/")
  .post(jsonParser, (req, res, next) => {
    const db = req.app.get("db");
    OrdersService.insertOrder(db, req.body)
      .then((order) =>
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${order.id}`))
          .json(order)
      )
      .catch(next);
  })
  .get((req, res, next) => {
    OrdersService.getAllOrders(req.app.get("db")).then((orders) =>
      res.status(200).json(orders)
    );
  });

  ordersRouter
    .route("/new/:orderId")
    .patch(requireAuth, jsonParser, async (req, res, next) => {
      const db = req.app.get("db")
      let currentOrder = await OrdersService.getOrderById(db, req.params.orderId);
      let updatedOrder = await OrdersService.updateOrder(db, req.params.orderId,  { amount: currentOrder.amount + req.body.amount })
      return res.status(200).json(updatedOrder);
    })

ordersRouter
  .route("/:orderId")
  .all(checkOrderExists)
  .get((req, res, next) => {
    return res.status(200).json(res.order);
  })
  .delete(requireAuth, (req, res, next) => {
    const db = req.app.get("db");
    // const { id } = req.params;
    OrdersService.deleteOrder(db, req.params.orderId)
      .then(() => res.status(204).end())
      .catch(next);
  })
  .patch(requireAuth, jsonParser, (req, res, next) => {
    const db = req.app.get("db");
    const { next_order, product, color, amount, prty_lvl, phase } = req.body;
    const newInfo = { next_order, product, color, amount, prty_lvl, phase };

    for (let info in newInfo) {
      if (newInfo[info] === undefined) {
        delete newInfo[info];
      }
    }

    if (!product && !color && amount === undefined && prty_lvl === undefined && !phase)
      return res
        .status(400)
        .json({ error: "Must update at least one required field" });

    OrdersService.updateOrder(db, req.params.orderId, newInfo)
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
    if (!order) return res.status(400).json({ error: "Order not found" });
    res.order = order;
    next();
  } catch (error) {
    next(error);
  }
}

  // ordersRouter
  //   .route('/colorprod/:color/:product')
  //   .get((req, res, next) => {
  //     const db = req.app.get("db")
  //     OrdersService.getOrderByColorProd(db, req.params.color, req.params.product)
  //     .then(order => {
  //       if (!order) return res.status.status(400).json({message: "Order Not Found"})
  //       return res.status(200).json(order)
  //     })
  //   })

//   ordersRouter
//   .route("/levels/:nextOrder")
//   .patch(requireAuth, jsonParser, async (req, res, next) => {
//     const db = req.app.get("db");
//     let nextOrder = await OrdersService.getOrderById(db, req.params.nextOrder);
//     nextOrder = await OrdersService.updateOrder(db, nextOrder.order_id, {
//       amount: nextOrder.amount + 1,
//     });
//     return res.status(200).json(nextOrder);
//   });

// ordersRouter
//   .route("/fkey/:orderId")
//   .get(async (req, res, next) => {
//     const {orderId} = req.params;
//     const order = await OrdersService.getOrderByFkey(req.app.get("db"), orderId);
//     return res.status(200).json(order)
//   })


module.exports = ordersRouter;
