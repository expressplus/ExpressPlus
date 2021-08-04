// author: Ulvi Memmedov
'use strict';
class MysqlController {

    private _conn;

    constructor(conn) {

        this._conn = conn
        this.Query = this.Query;

    }

    Query = (query, credentials = {}) => {
        return new Promise((resolve, reject) => {
            this._conn.query(query, credentials, function (err, rows, fields) {
                if (err) {
                    return reject(err);
                }
                resolve(Object.keys(rows).length > 1 ? rows : (Object.keys(rows).length > 0 ? rows[0] : null));
            });
        });
    }
}

module.exports = MysqlController