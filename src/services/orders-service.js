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
  getOrderByFkey(db, next_order){
    return db("orders")
      .select('*')
      .where({ next_order })
  },
  getOrderByColorProd(db, color, product){
    return db("orders")
      .select('*')
      .where( {color, product })
      .then(rows => rows[0])
  },
  // getBySourceOrder(db, source_order) {
  //   return db("orders")
  //     .select("*")
  //     .where({ source_order })
  //     .then((rows) => rows[0])
  //     .then((order) => {
  //       if (!!order) return OrdersService.serializeOrder(order);
  //       else return order;
  //     });
  // }
  // ,
  // updateLevel(db, source_order, amount) {
  //   return db("orders")
  //   .where( { source_order } )
  //   .update({ amount })
  //   .returning("*")
  //   .then((rows) => rows[0])
  // }
  // ,
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
  deleteOrder(db, order_id) {
    // console.log(order_id, "THIS IS IN DELETE ORDER")
    return db("orders").where({ order_id }).delete();
  },
 async deleteSingleOrder(db, order_id, amount) {
    return await db("orders").where({order_id}).update( {amount} ).returning('*').then((rows) => rows[0])
  }
  ,
  updateOrder(db, order_id, newOrderInfo) {
    return db("orders")
      .where({ order_id })
      .update({ ...newOrderInfo })
      .returning("*")
      .then((rows) => rows[0])
      .then((order) => {
        if (!!order) return OrdersService.serializeOrder(order);
        else return order;
      });
  },
  getAllOrders(db) {
    return db("orders")
    .select('*')
  }
  ,
  serializeOrder(order) {

    return {
      ...order,
      color: xss(order.color),
    };
  },
};

module.exports = OrdersService;
