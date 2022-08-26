const defaultConfiguration = {
  auth_server: {
    port: 7800,
    isUnderProxy: false,
    server_ip: "your.server.ip"
  },
  ymsg: {
    port: 5050
  },
  database: {
    subsystem: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    username: process.env.DB_USER || "yumeko",
    password: process.env.DB_PASSWORD || "yumeko",
    database: process.env.DB_DATABASE || "yumeko"
  }
};

var ConfigManager = new (require('../config_manager'))("yumeko", defaultConfiguration);

module.exports = ConfigManager;
