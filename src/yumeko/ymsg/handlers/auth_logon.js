const Packet = require("../utils/packet");
const PacketParameterCollection = require("../utils/packet_parameter_collection");
const PacketParameter = require("../utils/packet_parameter");
const UserIdentity = require("../../../models/user_identity");
const SessionManager = require("../session_manager");
const UserSession = require("../user_session");

module.exports = async (packet, conn) => {
	let a = PacketParameterCollection.Parse(packet.data);

	if (a.Has("135")) {
		console.log("using older version, prob. v6!");
	}

	let request = {
		// Build: a.Get("244").toString(),
		// Y: a.Get("277").toString(),
		// T: a.Get("278").toString(),
		// Response: a.Get("307").toString(),
		ID: a.Get("1").toString(),
		// Locale: a.Get("98").toString(),
		// Version: a.Get("135").toString(),
	};

	let u = UserIdentity.find(request.ID, "name");

	conn.session = new UserSession(u, conn, 1);

	console.log(`${u.isAllowed} - ${u.name} is allowed?`);

	if (!u || !u.isAllowed) return conn.session.FailLogin(3);

	// create a session for this user
	SessionManager.Register(conn.session);

	// send List(0x55), ListV15(0xf1), StatusV15(0xf0) / PagerLogon(0x01), NewMail(0xb) and Ping(0x12)
	// essential packets are ListV15 and StatusV15 / PagerLogon.

	let groups = conn.session.identity.Groups.map(
		(g) =>
			`${g.name}:${g.users
				.filter((u) => u)
				.map((u) => u.name)
				.join(",")}`
	).join("\n");

	let list = new PacketParameterCollection({
		2: request.ID,
		3: request.ID,
		87: groups,
		89: request.ID,
		70: "+40766121234", // SMS phone
		90: "FALSE", // has mail
		149: u.id.toString(),
		192: "meme",
		213: "1",
	});

	list.Add(new PacketParameter("59", `Y=n=${request.Y};`));

	let status = new PacketParameterCollection({
		0: request.ID,
		1: request.ID,
	});

	if (u.firstName && u.lastName) {
		list.Add(new PacketParameter("216", u.firstName));
		list.Add(new PacketParameter("254", u.lastName));
	}

	conn.write(new Packet(packet.protocol_version, packet.vendor_id, 0x55, 0, 0, list.Serialize()).Serialize()); // list
	conn.write(new Packet(packet.protocol_version, packet.vendor_id, 0xf1, 0, 0, list.Serialize()).Serialize()); // listV15

	conn.write(new Packet(packet.protocol_version, packet.vendor_id, 0xf0, 0, 0, status.Serialize()).Serialize()); // statusV15
	conn.write(new Packet(packet.protocol_version, packet.vendor_id, 0x01, 0, 0, status.Serialize()).Serialize()); // PagerLogon

	conn.write(new Packet(packet.protocol_version, packet.vendor_id, 0xb, 0, 0).Serialize()); // new mail
	conn.write(new Packet(packet.protocol_version, packet.vendor_id, 0x12, 0, 0).Serialize()); // ping

	// get messages
	conn.session.identity.UnreadMessages.forEach((m) => {
		conn.session.SendMessage(m.from.name, m.message, true, m.date.getTime());
		m.is_unread = false;
		m.save();
	});

	if (!conn.session.identity.last_connection) {
		conn.session.SendMessage(
			"yumeko",
			`Hello there, ${conn.session.identity.name}!
Welcome to our Yahoo! Messenger service, powered by fully open-source software!
We are honored to have you part of our journey in trying to revive Yahoo! Messenger and to bring back the nostalgia that everyone had back when this existed!

* This message was sent automatically by this server. Any replies to this message will be discarded. *`,
			false
		);
	}

	conn.session.identity.last_connection = new Date();
	conn.session.identity.save();

	// conn.session.UpdateStatus(SessionManager.GetOnlineUsers(), true);

	// tell everyone that we logged in
	// conn.session.identity.Friends.forEach(e => {
	//     SessionManager.FindByName(e.FriendTwo.name).forEach(session => session.SendStatus(conn.session.identity.name));
	// });

	conn.session.identity.FriendRequests.forEach((r) => {
		conn.session.SendAddBuddyRequest(r.Sender, r.message);
	});

	// conn.session.HasMail([
	//     {
	//         subject: "Milka",
	//         from: "yumeko@r0neko.me",
	//         fromName: "Yumeko",
	//         link: "https://r0neko.me?trolling"
	//     }
	// ]);
};
