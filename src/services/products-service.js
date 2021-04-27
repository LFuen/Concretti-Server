const xss = require("xss");

const ProductsService = {
  getProductById(db, id) {
    return db("products")
      .select("*")
      .where({ product_id })
      .first()
      .then((product) => {
        if (!!product) return ProductsService.serializeProduct(product);
        else return product;
      });
  },
  insertProduct(db, product) {
    return db
      .insert(product)
      .into("products")
      .returning("*")
      .then((rows) => rows[0])
      .then((product) => ProductsService.getProductById(db, product.id));
  },
  deleteProduct(db, id) {
    return db("products").where({ id }).delete();
  },
  updateProduct(db, id, newProductInfo) {
    return db("products")
      .where({ id })
      .update({ ...newProductInfo })
      .returning("*")
      .then((rows) => rows[0])
      .then((product) => ProductsService.getProductById(db, product.id));
  },
  serializeProduct(product) {
    return {
      ...product,
      name: xss(product.name),
    };
  },
};

module.exports = ProductsService;
