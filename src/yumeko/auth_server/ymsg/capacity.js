const config = require("../../config");

module.exports = (req, res) => {
    res.end(`COLO_CAPACITY=1 CS_IP_ADDRESS=${config.auth_server.server_ip}\r\n`);
}