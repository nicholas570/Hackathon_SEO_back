const CrudDao = require('./CrudDao');

class User extends CrudDao {
  static table = 'User';
}

module.exports = User;
