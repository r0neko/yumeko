const PacketParameterCollection = require("../utils/packet_parameter_collection");
const SessionManager = require("../session_manager");
const StatusType = require("../consts/status_types");
const StatusUtils = require("../utils/status");

module.exports = (packet, conn) => {
    let a = PacketParameterCollection.Parse(packet.data);
    let type = StatusUtils.YMSGStatusToYumekoStatus(a.Get("10").toString());

    if(type == StatusType.CUSTOM) {
        conn.session.status.message = a.Get("19").toString();
        conn.session.status.away = a.Get("47").toString() == "1";
    } else conn.session.status.message = "";
    
    conn.session.status.type = type;
    
    console.log(conn.session.status);

    conn.session.identity.Friends.forEach(e => {
        let s = SessionManager.FindByName(e.FriendTwo.name);
        s.forEach(session => session.UpdateStatus([conn.session]));
    });
};