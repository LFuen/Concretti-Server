const xss = require("xss");

const OrdersService = {
  getOrderById(db, id) {
    return db("orders")
      .select("*")
      .where({ order_id })
      .first()
      .then((order) => {
        if (!!order) return OrdersService.serializeOrder(order);
        else return order;
      });
  },
  insertOrder(db, order) {
    return db
      .insert(order)
      .into("orders")
      .returning("*")
      .then((rows) => rows[0])
      .then((order) => OrdersService.getOrderById(db, order.id));
  },
  deleteOrder(db, id) {
    return db("orders").where({ id }).delete();
  },
  updateOrder(db, id, newOrderInfo) {
    return db("orders")
      .where({ id })
      .update({ ...newOrderInfo })
      .returning("*")
      .then((rows) => rows[0])
      .then((order) => OrdersService.getOrderById(db, order.id));
  },
  serializeOrder(order) {
    return {
      ...order,
      color: xss(order.title),
      phase: xss(order.content),
    };
  },
};

module.exports = OrdersService;
