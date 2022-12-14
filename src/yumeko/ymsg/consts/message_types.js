const message_types = {
    LOGIN: 1,
    LOGOFF: 2,
    USER_AWAY: 3,
    USER_BACK: 4,
    USER_GET_MSGS: 5,
    MESSAGE: 6,
    ACTIVATE_ID: 7,
    DEACTIVATE_ID: 8,
    USER_STATUS: 10,
    USER_HAS_MAIL: 11,
    START_CONFERENCE: 12,
    CALENDAR_ALERT: 13,
    USER_PERSONAL_MESSAGE: 14,
    UPDATE_BUDDY_LIST: 15,
    UPDATE_ID_LIST: 16,
    UPDATE_IGNORE_LIST: 17,
    PING: 18,
    UPDATE_GROUP: 19,
    SYSTEM_MESSAGE: 20,
    CLIENT_STATS: 21,
    CLIENT_ALERT_STATS: 22,
    GROUP_MESSAGE: 23,
    HOST_CONFERENCE: 24,
    JOIN_CONFERENCE: 25,
    DECLINE_CONFERENCE: 26,
    LEAVE_CONFERENCE: 27,
    INVITE_CONFERENCE: 28,
    SAY_CONFERENCE: 29,
    CHAT_LOGIN: 30,
    CHAT_LOGOFF: 31,
    CHAT_MSG: 32,
    CHALLENGELESS_LOGIN: 38, // added by me
    GAMES_USER_LOGIN: 40,
    GAMES_USER_LOGOFF: 41,
    GAMES_USER_HAS_MSG: 42,
    NET2PHONE_STATS: 44,
    ADDRESSBOOK_ALERT: 51,
    AUCTION_ALERT: 60,
    USER_FT: 70,
    USER_FT_REPL: 71,
    USER_CONVERSE: 72,
    USER_WEBTOUR: 73,
    IM_ENABLE_VOICE: 74,
    NOTIFY: 75,
    SEND_PORT_CHECK: 76,
    SEND_DATA_THRU: 77,
    P2P_START: 79,
    MSGR_WEBCAM_TOKEN: 80,
    STATS: 81,
    USER_LOGIN_2: 84,
    PRELOGIN_DATA: 85,
    GET_COOKIE_DATA: 86,
    HELO: 87,
    FEATURE_NOT_SUPPORTED: 88,
    AUTH_BUDDY: 109,
    ADD_BUDDY: 131,
    REMOVE_BUDDY: 132,
    MODIFY_IGNORE_LIST: 133,
    DENY_BUDDY_ADD: 134,
    RENAME_GROUP: 137,
    KEEP_ALIVE: 138,
    YPC_ADD_FRIEND_APPROVAL: 139,
    CHALLENGE: 140,
    ADD_BUDDY_INSTANT_APPROVAL: 141,
    CHAT_MSGR_USER_LOGIN: 150,
    CHAT_GOTO_USER: 151,
    CHAT_ROOM_JOIN: 152,
    CHAT_ROOM_PART: 155,
    CHAT_ROOM_INVITE: 157,
    CHAT_MSGR_USER_LOGOFF: 160,
    CHAT_PING: 161,
    CHAT_WEBCAM_TOKEN: 167,
    CHAT_PUBLIC_MSG: 168,
    CHAT_ROOM_CREATE: 169,
    GAMES_INVITE: 183,
    GAMES_SEND_DATA: 184,
    EDIT_INVISIBLE_TO_LIST: 185,
    EDIT_VISIBLE_TO_LIST: 186,
    ANTIBOT: 187,
    AVATAR_CHANGED: 188,
    FRIEND_ICON: 189,
    FRIEND_ICON_DOWNLOAD: 190,
    AVATAR_GET_FILE: 191,
    AVATAR_GET_HASH: 192,
    DISPLAY_TYPE_CHANGED: 193,
    FRIEND_ICON_FT: 194,
    GET_COOKIE: 195,
    ADDRESS_BOOK_CHANGED: 196,
    SET_VISIBILITY: 197,
    STATUS: 198,
    AVATAR_PREFS: 199,
    VERIFY_USER: 200,
    AUDIBLE: 208,
    DISCONNECT_FOR_ABUSE: 209, // It is added by me
    IM_PANEL_FEATURE: 210,
    SHARE_CONTACTS: 211,
    IM_SESSION: 212,
    SUBSCRIPTION: 213,
    BUDDY_AUTHORIZE: 214,
    PHOTO_ADD: 215,
    PHOTO_SELECT: 216,
    PHOTO_DELETE: 217,
    PHOTO_FILE_REQUEST: 218,
    PHOTO_POINTER: 219,
    FXFER_INVITE: 220,
    FXFER_SEND: 221,
    FXFER_RECEIVE: 222,
    UPDATE_CAPABILITY: 223,
    REPORT_SPIM: 224,
    MINGLE_DATA: 225,
    ALERT: 226,
    APP_REGISTRY: 227,
    NEW_USER: 228,
    ACCEPT_MSGR_INVITE: 229,
    MSGR_USAGE: 230,
    BUDDY_MOVE: 231,
    GET_VOICE_CRUMB: 232,
    BUDDY_INFO: 240,
    BUDDY_LIST: 241,
    SUBSCRIBE: 244,
    UNSUBSCRIBE: 245,
    NEWS_ALERTS: 300,
    SYMANTEC_MSGS: 500,
    MOBILE_SEND_SMS_MESSAGE: 746,
    MOBILE_SMS_LOGIN: 748,
    MOBILE_SMS_NUMBER: 749,
    ANON_LOGOFF: 802,
    ANON_HAS_MSG: 806,
    STATUS_V15: 0xF0,
    LIST_V15: 0xF1,
}

module.exports = message_types;