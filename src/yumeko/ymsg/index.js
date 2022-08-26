const net = require('net');
const Packet = require("./utils/packet");
const MessageType = require("./consts/message_types");
const logger = require("../../logger");

const handlers = {
    [MessageType.LOGOFF]: require("./handlers/logoff"),
    [MessageType.SEND_PORT_CHECK]: require("./handlers/server_ping"),
    [MessageType.HELO]: require("./handlers/auth_helo"),
    [MessageType.USER_LOGIN_2]: require("./handlers/auth_logon"),
    [MessageType.SKIN_NAME]: require("./handlers/skin_name"),
    [MessageType.MESSAGE]: require("./handlers/message"),
    [MessageType.IM_SESSION]: require("./handlers/chat_session"),
    [MessageType.NOTIFY]: require("./handlers/notify"),
    [MessageType.ADD_BUDDY]: require("./handlers/add_buddy"),
    [MessageType.SET_STATUS]: require("./handlers/set_status"),
    [MessageType.REMOVE_BUDDY]: require("./handlers/remove_buddy"),
    [MessageType.BUDDY_AUTHORIZE]: require("./handlers/authorize_buddy")
}

function type_to_str(t) {
    return Object.keys(MessageType).filter(f => MessageType[f] == t)[0] || "Unknown";
}

class YMSGServer {
    constructor() {
        this.server = net.createServer();
        this.server.on('connection', this.OnConnection.bind(this));
        this.is_init = false;
    }

    Init() {
        return new Promise((r) => {
            if(this.is_init) return r(false);
            this.server.listen(require("../config").ymsg.port, function() {
                this.is_init = true;
                r(true);
            }.bind(this));
        });
    }

    OnConnection(c) {
        var remoteAddress = c.remoteAddress + ':' + c.remotePort;  
        logger.Info("New connection from:", remoteAddress);
    
        c.on('data', (d) => {  
            let p = Packet.Parse(d)
            if(!p) return;
    
            if(handlers[p.type])
                logger.Success(`HANDLED packet: type = ${p.type}(${type_to_str(p.type)}), status = ${p.status}, payload = ${p.data.toString('hex')}`);
            else if(p.type != 21) logger.Info(`Received new packet: type = ${p.type}(${type_to_str(p.type)}), status = ${p.status}, payload = ${p.data.toString('hex')}`);

            if(handlers[p.type]) handlers[p.type](p, c);
        });  
    
        c.once('close', () => {  
            logger.Success("Connection from", remoteAddress, "has ended.");
            handlers[MessageType.LOGOFF](null, c);
        });  
    
        c.on('error', (err) => {  
            logger.Failure("Connection from", remoteAddress, "has errored out:", err.message);  
        });
    }
}

let Instance = new YMSGServer();

module.exports = {
    Instance
};
