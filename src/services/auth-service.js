const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const bcrypt = require("bcryptjs")

const AuthService = {
  getUser(db, user_department) {
    return db("users").where({user_department}).first();
  },

  createJWT(user) {
    return jwt.sign({ user_id: user.user_id }, JWT_SECRET, {
      subject: user.user_department,
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
