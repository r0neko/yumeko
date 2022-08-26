const Model = require("../model");

class ConfigEntry extends Model {
    constructor() {
        super();
    }

    static GetValue(n, d = null) {
        let a = ConfigEntry.find(n, "name");

        if (a) return a.value;
        return d;
    }
}

ConfigEntry.table = "config";

module.exports = ConfigEntry;