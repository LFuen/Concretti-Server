const xss = require("xss");

const OrdersService = {
  getOrderById(db, order_id) {
    return db("orders")
      .select("*")
      .where({ order_id })
      .then((rows) => rows[0])
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
      .then((order) => {
        if (!!order) return OrdersService.serializeOrder(order);
        else return order;
      });
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
    console.log(order, "SERIALIZED ORDER")
    return {
      ...order,
      color: xss(order.color),
    };
  },
};

module.exports = OrdersService;
