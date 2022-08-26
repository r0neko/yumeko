const Packet = require("../utils/packet");
const PacketParameterCollection = require("../utils/packet_parameter_collection");
const MessageType = require("../consts/message_types");
const crypto = require("../../crypto");

module.exports = (packet, conn) => {
    let a = PacketParameterCollection.Parse(packet.data);
    
    let username = a.Get("1").toString();
    
    let collection = new PacketParameterCollection({
        "1": username,
        "13": "2",
        "94": crypto.get_uuid()
    });
    
    conn.write(
        new Packet(
            packet.packet_version,
            packet.vendor_id,
            MessageType.HELO,
            1,
            0,
            collection.Serialize()
        ).Serialize()
    );
};