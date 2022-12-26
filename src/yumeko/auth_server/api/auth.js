const crypto = require("../../crypto");
const UserIdentity = require("../../../models/user_identity");
const APISession = require("../../../models/api_session");

module.exports = async (req, res) => {
    let { username, password } = req.body;

    if (!username || !password) return res.json({ success: false, error: "MISSING_CREDS", message: "Missing Credentials" });

    let user = UserIdentity.where([["name", username]])[0];

    if (user == null || !(await crypto.check_password(password, user.password_hash))) {
        res.json({ success: false, error: "INVALID_CREDS", message: "Invalid Credentials" });
        return;
    }

    userSession = new APISession();
    
    userSession.owner_id = user.id;
    userSession.token = crypto.get_uuid();
    userSession.ip = req.ip;
    userSession.created_at = new Date();
    userSession.updated_at = new Date();

    userSession.save();

    res.json({ success: true, token: userSession.token });
}