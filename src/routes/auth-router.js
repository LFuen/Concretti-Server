const express = require("express");
const AuthService = require("../services/auth-service");

const authRouter = express.Router();
const jsonBodyParser = express.json();

authRouter.post("/login", jsonBodyParser, (req, res, next) => {
  const { user_department, user_password } = req.body;
  const loginUser = { user_department, user_password };
  for (const [key, value] of Object.entries(loginUser))
    if (value == null)
      return res.status(400).json({
        error: `Missing '${key}' in request body`,
      });
  AuthService.getUser(req.app.get("db"), loginUser.user_department)
    .then((dbUser) => {
      if (!dbUser)
        return res.status(400).json({
          error: "Incorrect user_name or password",
        });

      return AuthService.comparePasswords(
        loginUser.user_password,
        dbUser.user_password
      ).then((compareMatch) => {
        if (!compareMatch)
          return res.status(400).json({
            error: "Incorrect user_name or password",
          });

        const sub = dbUser.user_department;
        const payload = { user_id: dbUser.id };
        res.send({
          authToken: AuthService.createJWT(sub, payload),
        });
      });
    })
    .catch(next);
});

module.exports = authRouter;
