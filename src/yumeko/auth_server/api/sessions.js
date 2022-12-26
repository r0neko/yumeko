const SessionManager = require("../../ymsg/session_manager");

module.exports = async (req, res) => {
    res.json({
        success: true,
        sessions: SessionManager.FindByName(req.session.owner.name).map(s => s.token)
    });
}