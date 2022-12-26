const Packet = require("./utils/packet");
const PacketParameterCollection = require("./utils/packet_parameter_collection");
const MessageType = require("./consts/message_types");
const PacketParameter = require("./utils/packet_parameter");

const StatusType = require("./consts/status_types");
const StatusUtils = require("./utils/status");

class UserSession {
	constructor(identity, connection, session_id, token) {
		this.identity = identity;
		this.connection = connection;
		this.session_id = session_id;
		this.token = token;

		this.status = {
			type: StatusType.AVAILABLE,
			message: "",
			away: false,
		};

		this.proto_ver = 16;
	}

	BuddyAddToGroup(who, group, pending = true) {
		let req = new PacketParameterCollection();

		req.Add(new PacketParameter(65, group));
		req.Add(new PacketParameter(7, who));
		req.Add(new PacketParameter(223, pending ? "1" : "0"));
		req.Add(new PacketParameter(241, "0"));
		req.Add(new PacketParameter(1, this.identity.name));
		req.Add(new PacketParameter(66, "0"));

		this.connection.write(new Packet(this.proto_ver, 0, MessageType.ADD_BUDDY, 1, this.session_id, req.Serialize()).Serialize());
	}

	SendAddBuddyRequest(from, message = "") {
		let req = new PacketParameterCollection({
			4: from.name,
			5: this.identity.name,
			14: message,
			13: "-1",
		});

		if (from.firstName && from.lastName) {
			req.Add(new PacketParameter("216", from.firstName));
			req.Add(new PacketParameter("254", from.lastName));
		}

		this.connection.write(new Packet(this.proto_ver, 0, MessageType.BUDDY_AUTHORIZE, 3, this.session_id, req.Serialize()).Serialize());
	}

	Notify(from, status, flag = true) {
		let d = new PacketParameterCollection({
			49: status,
			4: from,
			5: this.identity.name,
			14: " ",
			13: (0 + flag).toString(),
		});

		this.connection.write(new Packet(this.proto_ver, 0, MessageType.NOTIFY, 22, this.session_id, d.Serialize()).Serialize());
	}

	SendStatus(who, away = false, status = StatusType.AVAILABLE, message = "") {
		let s = new PacketParameterCollection({
			192: "meme",
		});

		// s.Add(new PacketParameter("300", "315")); // begin buddy

		s.Add(new PacketParameter("7", who)); // current buddy
		s.Add(new PacketParameter("47", away ? "1" : "0")); // is it away message?
		s.Add(new PacketParameter("13", "1")); // what are they using, bitmask
		s.Add(new PacketParameter("19", message)); // custom status message

		if (who.first_name && who.last_name) {
			s.Add(new PacketParameter("216", who.first_name));
			s.Add(new PacketParameter("254", who.last_name));
		}

		// s.Add(new PacketParameter("301", "315")); // end buddy

		this.connection.write(new Packet(this.proto_ver, 0, this.proto_ver == 15 ? MessageType.STATUS_V15 : MessageType.STATUS, StatusUtils.YumekoStatusToYMSGStatus(status), this.session_id, s.Serialize()).Serialize());
	}

	UpdateStatus(statuses, is_auth = false) {
		let status = new PacketParameterCollection({
			0: this.identity.name,
			1: this.identity.name,
			8: statuses.length.toString(),
			192: "meme",
		});

		statuses.forEach((u) => {
			// status.Add(new PacketParameter("300", "315"));
			status.Add(new PacketParameter("7", u.identity.name));
			status.Add(new PacketParameter("10", StatusUtils.YumekoStatusToYMSGStatus(u.status.type).toString()));
			status.Add(new PacketParameter("17", "0"));
			status.Add(new PacketParameter("47", u.status.away ? "1" : "0"));
			status.Add(new PacketParameter("97", "1"));

			if (u.status.type == StatusType.CUSTOM) status.Add(new PacketParameter("19", u.status.message));

			status.Add(new PacketParameter("13", u.status.type != StatusType.INVISIBLE ? "1" : "0"));
			// status.Add(new PacketParameter("301", "315"));
		});

		this.connection.write(new Packet(this.proto_ver, 0, this.proto_ver == 15 ? MessageType.STATUS_V15 : MessageType.USER_STATUS, 0, this.session_id, status.Serialize()).Serialize());
	}

	FailLogin(code) {
		this.connection.write(
			new Packet(
				this.proto_ver,
				0,
				MessageType.USER_LOGIN_2,
				-1,
				this.session_id,
				new PacketParameterCollection({
					66: code.toString(),
				}).Serialize()
			).Serialize()
		);
	}

	SendPacket(command, status, params) {
		this.connection.write(
			new Packet(
				this.proto_ver,
				0,
				command,
				status,
				this.session_id,
				params.Serialize()
			).Serialize()
		);
	}

	HasMail(mails) {
		this.connection.write(
			new Packet(
				this.proto_ver,
				0,
				MessageType.USER_HAS_MAIL,
				1,
				this.session_id,
				new PacketParameterCollection({
					9: mails.length.toString(),
				}).Serialize()
			).Serialize()
		);
	}

	SendMessage(from, message, cached = false, time = Date.now()) {
		let p = new PacketParameterCollection({
			1: from,
			4: from,
			5: this.identity.name,
			14: message,
			206: "0",
			// "429": "id",
		});

		if (from.firstName && from.lastName) {
			p.Add(new PacketParameter("216", from.firstName));
			p.Add(new PacketParameter("254", from.lastName));
		}

		if (cached) {
			p.Add(new PacketParameter("32", "6"));
			p.Add(new PacketParameter("15", (time / 1000).toString()));
		}

		this.connection.write(new Packet(this.proto_ver, 0, MessageType.MESSAGE, cached ? 6 : 1, this.session_id, p.Serialize()).Serialize());
	}

	SendSystemMessage(from, message, time = Date.now()) {
		let p = new PacketParameterCollection({
			4: from,
			5: this.identity.name,
			14: message,
			15: (time / 1000).toString(),
			159: "0",
		});

		this.connection.write(new Packet(this.proto_ver, 0, MessageType.SYSTEM_MESSAGE, 1, this.session_id, p.Serialize()).Serialize());
	}
}

module.exports = UserSession;
