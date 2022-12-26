const logger = require("../../logger");

let sessions = [];

function Register(session) {
    logger.Info("Registering a new session for", session.identity.name, ".");
    sessions.push(session);
}

function Destroy(session) {
    logger.Info("Destroying a session for", session.identity.name, ".");
    sessions = sessions.filter(s => s != session);
}

function FindByName(name) {
    return sessions.filter(s => s.identity.name == name);
}

function FindByToken(token) {
    return sessions.find(s => s.token == token);
}

function FindByInstance(itx) {
    return sessions.filter(s => s == itx)[0];
}

function GetOnlineUsers() {
    return sessions.filter(
        (value, index, self) => self.map(s => s.identity.name).indexOf(value.identity.name) === index
    );
}

module.exports = {
    Register,
    Destroy,
    FindByInstance,
    FindByName,
    FindByToken,
    GetOnlineUsers
}