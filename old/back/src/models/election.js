module.exports = function (sequelize, Sequelize) {
  const Election = sequelize.define('election', {
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
  Election.associate = function (models) {
    Election.hasMany(models.candidate)
  }
  return Election
}
