const express = require("express");
const ColorsService = require("../services/colors-service");
const jsonParser = express.json();
const colorsRouter = express.Router();
const path = require("path");
const { requireAuth } = require("../middleware/jwt-auth");




colorsRouter.route("/").post(jsonParser, (req, res, next) => {
  const db = req.app.get("db");
  const { color_name, pigment_one, pigment_two, pigment_three, perk_one, perk_two, perk_three } = req.body;
  if (!color_name || !pigment_one || !pigment_two || !pigment_three || !perk_one || !perk_two || !perk_three)
    return res.status(400).json({ error: "Missing required fields" });
  const product = { color_name, pigment_one, pigment_two, pigment_three, perk_one, perk_two, perk_three };
  ColorsService.insertColor(db, product)
    .then((product) =>
      res
        .status(201)
        .location(path.posix.join(req.originalUrl, `/${product.id}`))
        .json(product)
    )
    .catch(next);
})
.get((req, res, next) => {
    ColorsService.getAllColors(req.app.get("db")).then(colors =>
     res.status(200).json(colors)
    )
})


colorsRouter
  .route("/:productId")
  .all(checkColorExists)
  .get((req, res, next) => {
    return res.status(200).json(res.product);
  })
  .delete(requireAuth, (req, res, next) => {
    const db = req.app.get("db");
    const { color_id } = res.product;
    colorsService.deleteColor(db, color_id)
      .then(() => res.status(204).end())
      .catch(next);
  })
  .patch(requireAuth, jsonParser, (req, res, next) => {
    const db = req.app.get("db");
    const { color_name, pigment_one, pigment_two, pigment_three, perk_one, perk_two, perk_three } = req.body;
    const newInfo = { color_name, pigment_one, pigment_two, pigment_three, perk_one, perk_two, perk_three };
    if (!color_name && !pigment_one && !pigment_two && !pigment_three && !perk_one && !perk_two && !perk_three)
      return res
        .status(400)
        .json({ error: "Must update either product, title, or content" });
    ColorsService.updateColor(db, res.product.color_id, newInfo)
      .then((product) => {
        return res.status(200).json(product);
      })
      .catch(next);
  });

async function checkColorExists(req, res, next) {
  try {
    const productId = req.params.productId;
    const db = req.app.get("db");
    const product = await ColorsService.getColorById(db, productId);
    if (!product)
      return res.status(400).json({ error: "Color not found" });
    res.product = product;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = colorsRouter;
