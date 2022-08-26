const crypto = require("../../crypto");

const LOGIN_CODE = {
    OK: 0,
    ERROR: 100
};

const CRLF = "\r\n";

function ResponseSelector(req, code) {
    // use text response on newer clients (version >= 10)
    if(req.get('User-Agent') && (req.get('User-Agent') == "CAL_TokenAuthenticator/1.0" || req.get('User-Agent') == "net_http_transaction_impl_manager/0.1")) {
        if(code == LOGIN_CODE.OK) return "success";
        if(code == LOGIN_CODE.ERROR) return "transient_error";
    }

    return code;
}

module.exports = (req, res) => {
    if(!req.query.token || !req.query.src)
        res.write(ResponseSelector(req, LOGIN_CODE.ERROR) + CRLF);
    else {
        // TODO: do token system
        if(true) {
            res.write(ResponseSelector(req, LOGIN_CODE.OK) + CRLF);
            res.write(`crumb=${crypto.get_uuid()}` + CRLF);
            res.write(`Y=${crypto.get_uuid()}` + CRLF);
            res.write(`T=${crypto.get_uuid()}` + CRLF);
            res.write(`cookievalidfor=86400` + CRLF);
            if(req.query.src == "ymsgrb")
                res.write(`B=${crypto.get_uuid()}` + CRLF);
            else res.write(`SSL=${crypto.get_uuid()}` + CRLF);
        } else {
            res.write(ResponseSelector(req, LOGIN_CODE.ERROR) + CRLF);
        }
    }

    res.end();
}