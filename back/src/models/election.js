module.exports = function (sequelize, Sequelize) {
  const election = sequelize.define('election', {
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
  return election
}
