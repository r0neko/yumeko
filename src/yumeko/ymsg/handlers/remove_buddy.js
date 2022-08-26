const UserIdentity = require("../../../models/user_identity");
const SessionManager = require("../session_manager");
const PacketParameterCollection = require("../utils/packet_parameter_collection");

module.exports = (packet, conn) => {
    let a = PacketParameterCollection.Parse(packet.data);

    let payload = {
        source: a.Get("1").toString(),
        target: a.Get("7").toString(),
        group: a.Get("65").toString(),
    }

    let src = UserIdentity.find(payload.source, "name");
    let target = UserIdentity.find(payload.target, "name");

    // if both users exist in the database, 
    if(src && target) {
        if(payload.group == "Friends") {
            src.Friends.filter(m => m.FriendTwo.name == target.name).forEach(e => e.delete());
            target.Friends.filter(m => m.FriendTwo.name == src.name).forEach(e => e.delete());
        }
    }
};