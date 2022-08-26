var Config = require("./config");
var Logger = require('../logger');
var Database = require("../database");
const Version = require('./version');
const AuthServer = require("./auth_server")
const YMSG = require("./ymsg");

async function Start() {
  // reset logger timing
  Logger.ResetTiming();

  const serverStartTime = new Date().getTime();

  // let the user know we started.
  Logger.Info(`Welcome to yumeko ${Version.formatted}`);
  Logger.Info("Initializing database connection...");

  // initialize DB Connection
  Database.Init();
  Database.GetSubsystem().Connect();

  Logger.Success("Connected to the database.");

  Logger.Info("Starting YMSG Server...");
  if(!(await YMSG.Instance.Init())) {
    Logger.Failure("Failed to start YMSG Server!");
    process.exit(-1);
  }
  Logger.Success("YMSG Server started successfully!");

  // start the authentication server.
  Logger.Info("Starting Authentication Server...");
  if(!(await AuthServer.Init())) {
    Logger.Failure("Failed to start Authentication Server!");
    process.exit(-1);
  }
  Logger.Success("Authentication Server started successfully!");

  const serverLoadTime = (new Date().getTime() - serverStartTime) / 1000;
  Logger.Success(`yumeko loaded in ${serverLoadTime}s. Listening on port ${Config.auth_server.port}`);
}

module.exports = Start;
