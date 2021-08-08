const xss = require("xss");

const ProductsService = {
  getProductById(db, product_id) {
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
      .then((product) => ProductsService.getProductById(db, product.product_id));
  },
  deleteProduct(db, product_id) {
    return db("products").where({ product_id }).delete();
  },
  updateProduct(db, product_id, newProductInfo) {
    return db("products")
      .where({ product_id })
      .update({ ...newProductInfo })
      .returning("*")
      .then((rows) => rows[0])
      .then((product) => ProductsService.getProductById(db, product.product_id));
  },
  getAllProducts(db) {
    return db("products")
    .select('*')
    .then(colors => colors.map(this.serializeProduct))
  },
  serializeProduct(product) {
    return {
      ...product,
      product_name: xss(product.product_name),
    };
  },
};

module.exports = ProductsService;
