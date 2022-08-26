const UserIdentity = require("../../../models/user_identity");
const SessionManager = require("../session_manager");
const Packet = require("../utils/packet");
const PacketParameterCollection = require("../utils/packet_parameter_collection");

module.exports = (packet, conn) => {
    let a = PacketParameterCollection.Parse(packet.data);

    let payload = {
        source: a.Get("1").toString(),
        target: a.Get("5").toString(),
    }

    let src = UserIdentity.find(payload.source, "name");
    let target = UserIdentity.find(payload.target, "name");

    // if both users exist in the database, 
    if(src && target) {
        // search for the session
        let session = SessionManager.FindByName(payload.target)

        let d = new PacketParameterCollection({
            "1": payload.target,
            "5": payload.source
        });
        
        let e = new Packet(16, 0, 212, 0, 0, d.Serialize());

        session.forEach(s => {
            e.session_id = s.session_id;
            s.connection.write(e.Serialize())
        });
    }
};