const Message = require("../../../models/message");
const UserIdentity = require("../../../models/user_identity");
const SessionManager = require("../session_manager");
const PacketParameterCollection = require("../utils/packet_parameter_collection");

module.exports = async (packet, conn) => {
    let a = PacketParameterCollection.Parse(packet.data);

    let payload = {
        source: a.Get("1").toString(),
        target: a.Get("5").toString(),
        message: a.Get("14").toString()
    }

    let src = UserIdentity.find(payload.source, "name");
    let target = UserIdentity.find(payload.target, "name");

    // if both users exist in the database, 
    if(src && target) {
        // search for the session
        let session = SessionManager.FindByName(payload.target);

        let msg = new Message({
            from: src,
            to: target,
            message: payload.message
        });

        msg.is_unread = session.length == 0;
        msg.save();
        
        session.forEach(s => s.SendMessage(payload.source, payload.message));

    }
};