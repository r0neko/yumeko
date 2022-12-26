const Model = require("../model");

class Role extends Model {
    constructor() {
        super();
    }
}

Role.table = "roles";

module.exports = Role;