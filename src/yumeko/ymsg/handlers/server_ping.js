module.exports = (packet, conn) => {
    packet.status = 1;
    conn.write(packet.Serialize())
};