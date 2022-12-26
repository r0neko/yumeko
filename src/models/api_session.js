const Model = require("../model");

class APISession extends Model {
    get owner() {
        const UserIdentity = require("./user_identity");
        return this.belongsTo(UserIdentity, "owner_id", "id");
    }
}

APISession.table = "api_sessions";

module.exports = APISession;