const UserIdentity = require("../../../models/user_identity");
const SessionManager = require("../session_manager");
const Packet = require("../utils/packet");
const PacketParameterCollection = require("../utils/packet_parameter_collection");

module.exports = (packet, conn) => {
    let a = PacketParameterCollection.Parse(packet.data);

    let payload = {
        source: a.Get("1").toString(),
        target: a.Get("5").toString(),
        flag: parseInt(a.Get("13").toString()),
    }

    if (conn.session.identity.name != payload.source) return;

    let r = conn.session.identity.FriendRequests.filter(e => e.Sender.name == payload.target);

    if (r.length > 0) {
        let request = r[0];

        request.Sender.getOrCreateGroup("Friends").add(request.Target);
        request.Target.getOrCreateGroup("Friends").add(request.Sender);

        request.delete();

        // SessionManager.FindByName(request.Sender.name).forEach(s => s.BuddyAddToGroup(request.Target, "Friends"));
        // SessionManager.FindByName(request.Target.name).forEach(s => s.BuddyAddToGroup(request.Sender, "Friends"));

        SessionManager.FindByName(request.Sender.name).forEach(s => s.SendStatus(request.Target));
        SessionManager.FindByName(request.Target.name).forEach(s => s.SendStatus(request.Sender));
    }
};