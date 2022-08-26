let QueryType = require("../../../model/query_type");

let SyntaxHandler = {
    [QueryType.QUERY_SELECT]: require("./select"),
    [QueryType.QUERY_UPDATE]: require("./update"),
    [QueryType.QUERY_INSERT]: require("./insert"),
    [QueryType.QUERY_DELETE]: require("./delete"),
    [QueryType.QUERY_LASTID]: require("./last_id")
}

function ReturnSyntax(query) {
    if(query != null && query.query_type != null && (x = SyntaxHandler[query.query_type]) != null) return x(query);
    return "";
}

module.exports = (q) => {
    let x = ReturnSyntax(q);
    console.log("Debug SQL Syntax:", x);
    return x;
};