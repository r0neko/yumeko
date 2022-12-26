const Express = require('express');
const HTTP = require('http');
const Logger = require("../../logger");
const Config = require("../config");
const requestIp = require('request-ip');

async function Init() {
    return new Promise(r => {
        var app = Express();
        if (Config.auth_server.isUnderProxy) app.set('trust proxy', true);

        app.use(requestIp.mw())
        app.use(Express.json());

        app.use((req, res, next) => {
            const version = require("../version");
            res.setHeader('X-Powered-By', 'Yumeko ' + version.formatted);

            Logger.Info(`${req.method} ${req.path} - ${req.ip} - ${new Date()} - ${req.get('User-Agent')}`);

            if (req.headers['content-type'] != 'application/json')
                req.pipe(require('concat-stream')(data => {
                    req.body = data;
                    next();
                }));
            else next();
        });

        app.use(require("./ymsg"));

        HTTP.createServer(app).listen(Config.auth_server.port, () => r(true));
    });
}

module.exports = {
    Init
};