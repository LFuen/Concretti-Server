const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const bcrypt = require("bcryptjs")
const config = require('../config')

const AuthService = {
  getUser(db, user_department) {
    return db("users").where({user_department}).first();
  },

  createJwt(subject, payload) {
    return jwt.sign(payload, config.JWT_SECRET, {
      subject,
      algorithm: "HS256",
    });
  },
  comparePasswords(password, hash) {
    return bcrypt.compare(password, hash);
  },

  verifyJWT(token) {
    return jwt.verify(token, JWT_SECRET, {
      algorithm: "HS256",
    });
  },
};

module.exports = AuthService;
