// author: Ulvi Memmedov
'use strict';

class PlusOrm {
    conn;
    constructor(conn){
        this.conn = conn;
    }

query = (query, callback, credentials = {}) => {
    conn.query(query, credentials, function (err, rows, fields) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, rows);
      }
    });
  }
  
querySync = (query, credentials = {}) => {
    return new Promise(function (resolve, reject) {
      conn.query(query, credentials, function (err, rows, fields) {
        if (err) {
          return reject(err);
        }
        resolve(Object.keys(rows).length > 1 ? rows : (Object.keys(rows).length > 0 ? rows[0] : null));
      });
    });
  }
  
querySyncForMap = (query, credentials = {}) => {
    return new Promise(function (resolve, reject) {
      conn.query(query, credentials, function (err, rows, fields) {
        if (err) {
          return reject(err);
        }
        resolve(Object.keys(rows).length > 0 ? rows : []);
      });
    });
  }
insert = (table, data, callback) => {
    const keys = Object.keys(data).join(',');
    const valuesK = Object.values(data).map(v => (v || String(v) === '0') ? "?" : "DEFAULT").join(",");
    const values = Object.values(data).filter(v => (v || String(v) === '0'));
    const query = `INSERT INTO ${table} (${keys}) VALUES (${valuesK})`;
    querySync(query, values).then(done => {
      callback(done.insertId);
    }).catch(err => callback({ error: err.sqlMessage }));
  }
  
insertList = (table, datas, datakeys, extraData, callback) => {
    const keys = datakeys.join(',');
    const valuesK = datas.map((data) => datakeys.map(k => (extraData[k] || String(extraData[k]) === '0' || data[k] || String(data[k]) === '0') ? "?" : "DEFAULT").join(',')).join('),(');
    const values = datas.flatMap(data => datakeys.map(key => (extraData[key] || String(extraData[key]) === '0') ? extraData[key] : ((data[key] || String(data[key]) === '0') ? data[key] : "")).filter(v => (v || String(v) === '0')));
    const query = `INSERT INTO ${table} (${keys}) VALUES (${valuesK})`;
    querySync(query, values).then(() => {
      callback(true);
    }).catch(err => callback({ error: err.sqlMessage }));
  }
  
update = (table, data, credentials, callback) => {
    const values = [];
    const columns = `UPDATE ${table} SET` + Object.keys(data).map(v => {
      if (data[v] || String(data[v]) === '0') {
        values.push(data[v]);
        return ` ${v}=? `;
      } else {
        return ` ${v}=DEFAULT `;
      }
    }).join(',');
  
    const creds = " WHERE " + Object.keys(credentials).map(v => {
      values.push(credentials[v]);
      return ` ${v}=? `;
    }).join(' and ');
  
    querySync(columns + creds, values).then(done => {
      callback(true);
    }).catch(err => callback({ error: err.sqlMessage }));
  }

delete = (table, credentials, callback) => {
    const values = [];
    const query = `DELETE FROM ${table} WHERE ` + Object.keys(credentials).map(v => {
      values.push(credentials[v]);
      return ` ${v}=? `;
    }).join(' and ');
    querySync(query, values).then(done => {
      callback(true);
    }).catch(err => callback({ error: err.sqlMessage }));
  }
  
select = (table, columns, credentials, callback) => {
    const values = [];
    let crndtls = '';
    if (credentials) {
      crndtls = "WHERE " + Object.keys(credentials).map(v => {
        values.push(credentials[v]);
        return ` ${v}=? `;
      }).join(' and ');
    }
    const query = `SELECT ${columns} FROM ${table} ${crndtls}`;
    querySync(query, values).then(done => {
      callback(done);
    }).catch(err => callback({ error: err.sqlMessage }));
  }
  
selectForMap = (table, columns, credentials, callback) => {
    const values = [];
    let crndtls = '';
    if (credentials) {
      crndtls = "WHERE " + Object.keys(credentials).map(v => {
        values.push(credentials[v]);
        return ` ${v}=? `;
      }).join(' and ');
    }
    query(`SELECT ${columns} FROM ${table} ${crndtls}`, (err, done) => {
      if (err) {
        callback({ error: err.sqlMessage });
      } else {
        callback(done);
      }
    }, values);
  }
  
}




module.exports = PlusOrm;