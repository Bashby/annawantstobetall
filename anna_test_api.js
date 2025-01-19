"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fsq_developers_1 = require("@api/fsq-developers");
fsq_developers_1.default.auth("QTZD2NMLPUH4V44WBE5XINC0EFUDVN2RWAA4WCMP21KL2J0N");
fsq_developers_1.default
    .getUserCheckins({ v: "20231010", limit: "100", offset: "0" })
    .then(function (_a) {
    var data = _a.data;
    return console.log(data);
})
    .catch(function (err) { return console.error(err); });
