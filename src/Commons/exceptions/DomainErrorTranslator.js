const InvariantError = require('./InvariantError');

const DomainErrorTranslator = {
  translate(error) {
    switch (error.message) {
      case 'REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY':
        return new InvariantError('tidak dapat membuat user baru karena properti yang dibutuhkan tidak ada');
      case 'REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION':
        return new InvariantError('tidak dapat membuat user baru karena tipe data tidak sesuai');
      case 'REGISTER_USER.USERNAME_LIMIT_CHAR':
        return new InvariantError('tidak dapat membuat user baru karena karakter username melebihi batas limit');
      case 'REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER':
        return new InvariantError('tidak dapat membuat user baru karena username mengandung karakter terlarang');
      default:
        return error;
    }
  },
};

module.exports = DomainErrorTranslator;