const Router = require("express").Router;
const APISession = require("../../../models/api_session");

let ApiRouter = new Router();

function requireAuth(req, res, next) {
    let auth_hdr = req.headers["authorization"];

    if (!auth_hdr)
        return res.json({ success: false, error: "MISSING_AUTH", message: "Missing Token" });

    let auth_split = auth_hdr.split(" ");
    if(auth_split.length != 2 || auth_split[0] != "Bearer")
        return res.json({ success: false, error: "INVALID_AUTH", message: "Invalid Token" });

    let userSession = APISession.find(auth_split[1], "token");
    if (userSession == null || userSession.ip != req.ip)
        return res.json({ success: false, error: "INVALID_SESSION", message: "Invalid Session" });

    req.session = userSession;
    next();
}

ApiRouter.get("/", (req, res) => res.json({ status: "ok" }));
// ApiRouter.post("/session/auth", require("./session_auth"));

ApiRouter.post("/auth", require("./auth"));
ApiRouter.get("/sessions", requireAuth, require("./sessions"));

ApiRouter.post("/session/:token", requireAuth, require("./inject"));

module.exports = ApiRouter;