const crypto = require("crypto");
const bcrypt = require("bcrypt");
const uuid = require("uuid").v4;

function crypto_create_hash(algo, str) {
	return crypto.createHash(algo).update(str).digest("hex");
}

async function password_hash(password) {
	return bcrypt.hash(password, 10);
}

async function check_password(password, hashed) {
    // dirty hack to support laravel bcrypt hashing
    if(hashed.startsWith("$2y$"))
        return check_password(password, "$2b$" + hashed.substring(4));

	return bcrypt.compare(password, hashed);
}

function get_uuid() {
	return uuid();
}

module.exports = {
	password_hash,
	check_password,
	get_uuid,
};
