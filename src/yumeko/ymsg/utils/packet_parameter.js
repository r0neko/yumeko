const PACKET_PARAM_SEPARATOR = Buffer.from([0xC0, 0x80]);

class PacketParameter {
    constructor(id, data) {
        this.id = id;
        this.data = data;
    }

    Serialize() {
        return Buffer.concat([Buffer.from(this.id.toString()), PACKET_PARAM_SEPARATOR, Buffer.from(this.data.toString()), PACKET_PARAM_SEPARATOR]);
    }
}

module.exports = PacketParameter;