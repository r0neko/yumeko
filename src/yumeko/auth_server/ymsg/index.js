const Router = require("express").Router;

let AuthRouter = new Router();

AuthRouter.get("/capacity", require("./capacity"))
AuthRouter.get("/config/pwtoken_get", require("./pwtoken_get"))
AuthRouter.get("/config/pwtoken_login", require("./pwtoken_login"))

AuthRouter.use('/api', require("../api"));

AuthRouter.get("*", require("./version"));

module.exports = AuthRouter;