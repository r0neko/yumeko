const PacketParameter = require("./packet_parameter");

function GetOffsetOfDelimiter(date) {
    for(let offset = 0; offset <= date.length - 1; offset++)
        if (date[offset] == 0xC0 && date[offset + 1] == 0x80) return offset;

    return -1;
}

class PacketParameterCollection {
    constructor(obj) {
        this.params = [];

        if(obj instanceof Object)
            Object.keys(obj).forEach(d => this.Add(new PacketParameter(d, obj[d])));
    }

    Add(p) {
        this.params.push(p);
    }

    Get(id) {
        let a = this.params.filter(x => x.id == id)[0];
        return a ? a.data : null;
    }

    Has(id) {
        return this.Get(id) != null;
    }

    static Parse(data) {
        let collection = new PacketParameterCollection();

        let d = Buffer.from(data);

        while(d.length > 0) {
            let o = GetOffsetOfDelimiter(d);
            let field_id = d.slice(0, o).toString();
            d = d.slice(o + 2);

            o = GetOffsetOfDelimiter(d);
            let content = d.slice(0, o);
            d = d.slice(o + 2);

            collection.Add(new PacketParameter(field_id, content));
        }

        return collection;
    }

    Serialize() {
        return Buffer.concat(this.params.map(p => p.Serialize()));
    }
}

module.exports = PacketParameterCollection;