const Model = require("../model");

class UserFriendship extends Model {
    get Friend() {
        const UserIdentity = require("./user_identity");
        return this.belongsTo(UserIdentity, "friend", "id");
    }

    get Friendee() {
        const UserIdentity = require("./user_identity");
        return this.belongsTo(UserIdentity, "friendee", "id");
    }
}

UserFriendship.table = "friend_relationships";
UserFriendship.id = "id";

module.exports = UserFriendship;