const xss = require("xss");

const ColorsService = {
  getColorById(db, color_id) {
    return db("colors")
      .select("*")
      .where({ color_id })
      .first()
      .then((color) => {
        if (!!color) return ColorsService.serializeColor(color);
        else return color;
      });
  },
  insertColor(db, color) {
    return db
      .insert(color)
      .into("colors")
      .returning("*")
      .then((rows) => rows[0])
      .then((color) => ColorsService.getColorById(db, color.color_id));
  },
  deleteColor(db,color_id) {
    return db("colors").where({color_id }).delete();
  },
  updateColor(db, color_id, newColorInfo) {
    return db("colors")
      .where({color_id })
      .update({ ...newColorInfo })
      .returning("*")
      .then((rows) => rows[0])
      .then((color) => ColorsService.getColorById(db, color.color_id));
  },
  getAllColors(db) {
    return db("colors")
    .select('*')
    .orderBy("color_name", "asc")
    .then(colors => colors.map(this.serializeColor))
  },
  serializeColor(color) {
    return {
      ...color,
      color_name: xss(color.color_name),
      pigment_one: xss(color.pigment_one), 
      pigment_two: xss(color.pigment_two), 
      pigment_three: xss(color.pigment_three)
    };
  },
};

module.exports = ColorsService;
