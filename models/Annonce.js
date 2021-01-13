const connection = require('../config/connection');
const CrudDao = require('./CrudDao');

class Annonce extends CrudDao {
  static table = 'annonces';

  static companyFK = 'entreprises';

  static findOneById(id) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT a.id, a.duree, a.debut, a.prix, a.localisation, a.niveau_etudes, a.langage, a.description, a.type, a.expertise, a.slug, a.disponible 
                    FROM ${this.table} AS a 
                    JOIN ${this.companyFK} AS c 
                    ON c.id = a.entreprises_id  
                    WHERE a.id = ?`;

      connection.query(sql, [id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0]);
        }
      });
    });
  }

  static findAllAnnonces() {
    return new Promise((resolve, reject) => {
      const sql = `SELECT a.id, a.duree, a.debut, a.prix, a.localisation, a.niveau_etudes, a.langage, a.description, a.type, a.expertise, a.slug, a.disponible, c.nom, c.adresse, c.mail, c.telephone, c.domaine, c.logo, c.logo_small 
                    FROM ${this.table} AS a 
                    JOIN ${this.companyFK} AS c 
                    ON a.entreprises_id = c.id 
                    ORDER BY a.debut`;

      connection.query(sql, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
}

module.exports = Annonce;
