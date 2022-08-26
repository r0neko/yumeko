const Model = require("../model");

class UserGroupUser extends Model {
    get user() {
        const UserIdentity = require("./user_identity");
        return this.belongsTo(UserIdentity, "user_id", "id");
    }
}

UserGroupUser.table = "user_group_users";

module.exports = UserGroupUser;