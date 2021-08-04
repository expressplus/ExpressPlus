// author: Ulvi Memmedov
'use strict';
var MysqlController = /** @class */ (function () {
    function MysqlController(conn) {
        var _this = this;
        this.Query = function (query, credentials) {
            if (credentials === void 0) { credentials = {}; }
            return new Promise(function (resolve, reject) {
                _this._conn.query(query, credentials, function (err, rows, fields) {
                    if (err) {
                        return reject(err);
                    }
                    resolve(Object.keys(rows).length > 1 ? rows : (Object.keys(rows).length > 0 ? rows[0] : null));
                });
            });
        };
        this._conn = conn;
        this.Query = this.Query;
    }
    return MysqlController;
}());
module.exports = MysqlController;
