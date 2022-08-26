const Model = require("../model");
const ConfigEntry = require("./config_entry");
const FriendRequestInvite = require("./friend_request_invite");
const Role = require("./role");
const UserGroup = require("./user_group");

class UserIdentity extends Model {
    get isAllowed() {
        // if (ConfigEntry.GetValue("Blacklist", "none") == "OnlyAdmins")
        //     return this.HasRole("Admin");
        return true;
    }

    get Groups() {
        return this.hasMany(UserGroup, "id", "owner");
    }

    getGroup(name) {
        return this.Groups.filter(g => g.name == name)[0];
    }

    getOrCreateGroup(name) {
        let g = this.getGroup(name);

        if (g == null)
            g = this.createGroup(name);

        return g;
    }

    createGroup(name) {
        let g = new UserGroup();

        g.owner = this.id;
        g.name = name;

        g.save();

        return g;
    }

    get FriendRequests() {
        return this.hasMany(FriendRequestInvite, "id", "target");
    }

    HasRole(role) {
        if (this.role == null) return false;
        console.log(this.getRole());

        return this.getRole().name == role;
    }

    getRole() {
        return this.belongsTo(Role, "role", "id");
    }

    get Friends() {
        const UserFriendship = require("./user_friendship");
        return UserFriendship.where("friendee", this.id);
    }

    get UnreadMessages() {
        const Message = require("./message");

        return Message.where([
            ["to_user", this.id],
            ["is_unread", 1]
        ]);
    }
}

UserIdentity.table = "users";

module.exports = UserIdentity;