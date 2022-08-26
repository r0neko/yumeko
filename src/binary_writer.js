class BinaryWriter {
    constructor(buffer) {
        this.Buffer = buffer;
        this.Location = 0;
    }

    IncrementLocation(bytes) {
        let current = this.Location;
        this.Location += bytes;
        return current;
    }

    WriteByte(b) {
        return this.Buffer.writeInt8(b, this.IncrementLocation(1));
    }

    WriteBytes(b) {
        for (let i = 0; i < b.length; i++)
            this.WriteByte(b[i])
    }

    Write(d) {
        return this.Buffer.write(d, this.IncrementLocation(d.length));
    }

    WriteShort(s) {
        return this.Buffer.writeInt16LE(s, this.IncrementLocation(2));
    }

    WriteShortBE(s) {
        return this.Buffer.writeInt16BE(s, this.IncrementLocation(2));
    }

    WriteInt32BE(n) {
        return this.Buffer.writeInt32BE(n, this.IncrementLocation(4));
    }

    WriteUInt32BE(n) {
        return this.Buffer.writeUInt32BE(n, this.IncrementLocation(4));
    }

    WriteInt32(n) {
        return this.Buffer.writeInt32LE(n, this.IncrementLocation(4));
    }
}

module.exports = BinaryWriter;