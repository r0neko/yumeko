const Model = require("../model");

class Message extends Model {
    constructor(args) {
        super();
        if(args) {
            args.from && (this.from_user = args.from.id);
            args.to && (this.to_user = args.to.id);
            args.message && (this.message = args.message);
        }
    }

    get from() {
        const UserIdentity = require("./user_identity");
        return this.belongsTo(UserIdentity, "from_user", "id");
    }

    get to() {
        const UserIdentity = require("./user_identity");
        return this.belongsTo(UserIdentity, "to_user", "id");
    }
}

Message.table = "messages";

module.exports = Message;