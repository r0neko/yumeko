const SessionManager = require("../../ymsg/session_manager");
const PacketParameterCollection = require("../../ymsg/utils/packet_parameter_collection");
const PacketParameter = require("../../ymsg/utils/packet_parameter");

module.exports = async (req, res) => {
    let session = SessionManager.FindByToken(req.params.token);

    if (session == null)
        return res.json({ success: false, error: "INVALID_SESSION", message: "Invalid Session" });

    if(session.identity.id != req.session.owner.id)
        return res.json({ success: false, error: "UNAUTHORIZED", message: "Unauthorized" });

    if(req.body.payload == null)
        return res.json({ success: false, error: "MISSING_PAYLOAD", message: "Missing Payload" });

    let col = new PacketParameterCollection();

    if(req.body.payload.command == null)
        return res.json({ success: false, error: "MISSING_COMMAND", message: "Missing Command" });
    else if(req.body.payload.status == null)
        return res.json({ success: false, error: "MISSING_STATUS", message: "Missing Status" });

    let fields = req.body.payload.fields || [];

    fields.forEach(f => col.Add(new PacketParameter(parseInt(f.key), f.value)));

    session.SendPacket(parseInt(req.body.payload.command), parseInt(req.body.payload.status), col);

    res.json({
        success: true
    });
}