const connection = require('../config/connection');

class CrudDao {
  static table;

  static findOne(data) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM ${this.table} WHERE ?`;

      connection.query(sql, [data], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0]);
        }
      });
    });
  }

  static create(data) {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO ${this.table} SET ?`;

      connection.query(sql, [data], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
}

module.exports = CrudDao;
