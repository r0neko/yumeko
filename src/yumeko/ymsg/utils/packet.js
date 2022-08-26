const BinaryReader = require("../../../binary_reader");
const BinaryWriter = require("../../../binary_writer");

class Packet {
    constructor(protocol_version, vendor_id, type, status, session_id, data = null) {
        this.protocol_version = protocol_version;
        this.vendor_id = vendor_id;
        this.type = type;
        this.status = status;
        this.session_id = session_id;
        this.data = data || Buffer.alloc(1);
    }

    static Parse(buffer) {
        let br = new BinaryReader(buffer);

        let header = br.ReadBytes(4).toString();
        if(header != "YMSG") return null;

        let proto_ver = br.ReadShortBE();

        let packet = {
            vid: br.ReadShortBE(),
            length: br.ReadShortBE(),
            type: br.ReadShortBE(),
            status: br.ReadInt32BE(),
            session_id: br.ReadInt32BE()
        };

        return new Packet(proto_ver, packet.vid, packet.type, packet.status, packet.session_id, br.ReadBytes(packet.length));
    }

    MakeHeader() {
        let w = new BinaryWriter(Buffer.alloc(20));

        w.WriteBytes(Buffer.from("YMSG"));
        w.WriteShortBE(this.protocol_version);
        w.WriteShortBE(this.vendor_id);
        w.WriteShortBE(this.data.length);
        w.WriteShortBE(this.type);
        w.WriteInt32BE(this.status);
        w.WriteInt32BE(this.session_id);

        return w.Buffer;
    }

    Serialize() {
        return Buffer.concat([this.MakeHeader(), this.data]);
    }
}

module.exports = Packet;
