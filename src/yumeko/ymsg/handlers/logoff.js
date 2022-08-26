const SessionManager = require("../session_manager");
const StatusType = require("../consts/status_types");

module.exports = (packet, conn) => {
    if (conn.session) {
        // before destroying the session tell everyone that we logged out!
        // conn.session.identity.Friends.forEach(e => {
        //     SessionManager.FindByName(e.FriendTwo.name).forEach(session => session.SendStatus(conn.session.identity.name, false, StatusType.OFFLINE));
        // });

        SessionManager.Destroy(conn.session);
        conn.session = null;
    }
};