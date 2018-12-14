module.exports = function (sequelize, Sequelize) {
  return sequelize.define('election', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.TEXT
    }
  })
}
