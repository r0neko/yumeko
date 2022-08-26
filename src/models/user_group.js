const Model = require("../model");
const UserGroupUser = require("./user_group_user");

class UserGroup extends Model {
    get users() {
        return this.hasMany(UserGroupUser, "id", "group_id").map(g => g.user);
    }

    add(user) {
        let u = new UserGroupUser();

        u.group_id = this.id;
        u.user_id = user.id;

        u.save();
    }
}

UserGroup.table = "user_groups";

module.exports = UserGroup;