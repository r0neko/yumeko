const Model = require("../model");

class Role extends Model {
    constructor() {
        super();
    }
}

Role.table = "role";

module.exports = Role;