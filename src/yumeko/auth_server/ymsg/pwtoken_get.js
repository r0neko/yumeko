const UserIdentity = require("../../../models/user_identity");
const config = require("../../config");
const crypto = require("../../crypto");

const LOGIN_CODE = {
	OK: 0,
	CREDS_MISSING: 100,
	WRONG_CREDS: 1212,
	BANNED: 1218,
};

const CRLF = "\r\n";

function get_token_name(src) {
	return src == "ymsgrb" ? "ymsgrb" : "ymsgr";
}

module.exports = async (req, res) => {
	if (!req.query.src && !req.query.login && !req.query.passwd) res.write(LOGIN_CODE.CREDS_MISSING + CRLF);
	else {
		let user = UserIdentity.where([["name", req.query.login]])[0];

		if (user == null || !(await crypto.check_password(req.query.passwd, user.password_hash))) {
			res.write(LOGIN_CODE.WRONG_CREDS + CRLF);
			return;
		}

		if (user.isAllowed) {
			res.write(LOGIN_CODE.OK + CRLF);
			res.write(`${get_token_name(req.query.src)}=${crypto.get_uuid()}` + CRLF);
			res.write(`partnerid=${crypto.get_uuid()}` + CRLF);
		} else {
			console.log(`${user.name} is not allowed to sign in.`);
			res.write(LOGIN_CODE.BANNED + CRLF);
		}
	}

	res.end();
};
