const express = require("express");
const ProductsService = require("../services/products-service");
const jsonParser = express.json();
const productsRouter = express.Router();
const path = require("path");
const { requireAuth } = require("../middleware/jwt-auth");




productsRouter.route("/").post(jsonParser, (req, res, next) => {
  const db = req.app.get("db");
  const { name } = req.body;
  if (!name)
    return res.status(400).json({ error: "Missing required fields" });
  const product = { name };
  ProductsService.insertProduct(db, product)
    .then((product) =>
      res
        .status(201)
        .location(path.posix.join(req.originalUrl, `/${product.id}`))
        .json(product)
    )
    .catch(next);
})
.get((req, res, next) => {
    ProductsService.getAllProducts(req.app.get("db")).then(products =>
     res.status(200).json(products)
    )
})


productsRouter
  .route("/:productId")
  .all(checkProductExists)
  .get((req, res, next) => {
    return res.status(200).json(res.product);
  })
  .delete(requireAuth, (req, res, next) => {
    const db = req.app.get("db");
    const { id } = res.product;
    productsService.deleteProduct(db, id)
      .then(() => res.status(204).end())
      .catch(next);
  })
  .patch(requireAuth, jsonParser, (req, res, next) => {
    const db = req.app.get("db");
    const { name } = req.body;
    const newInfo = { name };
    if (!name)
      return res
        .status(400)
        .json({ error: "Must update either product, title, or content" });
    ProductsService.updateProduct(db, res.product.id, newInfo)
      .then((product) => {
        return res.status(200).json(product);
      })
      .catch(next);
  });

async function checkProductExists(req, res, next) {
  try {
    const productId = req.params.productId;
    const db = req.app.get("db");
    const product = await ProductsService.getProductById(db, productId);
    if (!product)
      return res.status(400).json({ error: "Product not found" });
    res.product = product;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = productsRouter;
