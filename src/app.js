require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require('./config')
const validateBearerToken = require('./middleware/bearer-token')
const errorHandler = require('./middleware/error-handler')
const authRouter = require('./routes/auth-router')
const authRouter = require('./routes/orders-router')
const authRouter = require('./routes/products-router')
const app = express();

const morganSetting = process.env.NODE_ENV === 'production' ? 'tiny' : 'common'
app.use(morgan(morganSetting))
app.use(helmet());
app.use(cors());

app.use(errorHandler)
app.use(validateBearerToken);

app.use("/api/auth", authRouter);
app.use("/api/orders", authRouter);
app.use("/api/products", authRouter);


module.exports = app;
