const UserIdentity = require("../../../models/user_identity");
const MessageType = require("../consts/message_types");
const SessionManager = require("../session_manager");
const Packet = require("../utils/packet");
const PacketParameterCollection = require("../utils/packet_parameter_collection");

module.exports = (packet, conn) => {
    let a = PacketParameterCollection.Parse(packet.data);

    let payload = {
        source: a.Get("1").toString(),
        target: a.Get("7").toString(),
        msg: a.Get("14").toString(),
    }

    let src = UserIdentity.find(payload.source, "name");
    let target = UserIdentity.find(payload.target, "name");

    // if both users exist in the database, 
    if(src && target) {
        // search for the session
        let session = SessionManager.FindByName(payload.target)
        session.forEach(s => s.SendAddBuddyRequest(src, payload.msg));
        conn.session.BuddyAddToGroup(payload.target, "Friends", true);
    }
};