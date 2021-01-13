const CrudDao = require('./CrudDao');

class User extends CrudDao {
  static table = 'annonces';
}

module.exports = User;
