class BinaryReader {
    constructor(buffer) {
        this.Buffer = buffer;
        this.Location = 0;
    }

    Available() {
        return this.Location < this.Buffer.length;
    }

    IncrementLocation(bytes) {
        let current = this.Location;
        this.Location += bytes;
        return current;
    }

    ReadByte() {
        return this.Buffer.readInt8(this.IncrementLocation(1));
    }

    ReadBytes(count) {
        let buf = this.Buffer.slice(this.Location, this.Location + count);
        this.Location += count;
        return buf;
    }

    ReadShort() {
        return this.Buffer.readInt16LE(this.IncrementLocation(2));
    }

    ReadShortBE() {
        return this.Buffer.readInt16BE(this.IncrementLocation(2));
    }

    ReadInt32() {
        return this.Buffer.readInt32LE(this.IncrementLocation(4));
    }

    ReadInt32BE() {
        return this.Buffer.readInt32BE(this.IncrementLocation(4));
    }
}

module.exports = BinaryReader;