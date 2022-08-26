const Model = require("../model");

class FriendRequestInvite extends Model {
    get Sender() {
        const UserIdentity = require("./user_identity");
        return this.belongsTo(UserIdentity, "sender", "id");
    }

    get Target() {
        const UserIdentity = require("./user_identity");
        return this.belongsTo(UserIdentity, "target", "id");
    }
}

FriendRequestInvite.table = "friend_request_invites";

module.exports = FriendRequestInvite;