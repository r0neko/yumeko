const config = require("../yumeko/config");

const subsystems = {
  "mysql": require("./subsystems/mysql_subsystem")
};

var DBSubsystem = null;

function Init() {
  DBSubsystem = new subsystems[config.database.subsystem.toLowerCase()];

  DBSubsystem.databaseHost = config.database.host;
  DBSubsystem.databasePort = config.database.port;
  DBSubsystem.databaseUser = config.database.username;
  DBSubsystem.databasePassword = config.database.password;
  DBSubsystem.database = config.database.database;
}

function GetSubsystem() {
  if(DBSubsystem == null) Init();
  return DBSubsystem;
}

module.exports = {
  Init,
  GetSubsystem
};
