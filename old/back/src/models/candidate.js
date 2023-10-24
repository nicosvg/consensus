'use strict'
module.exports = (sequelize, DataTypes) => {
  const Candidate = sequelize.define('candidate', {
    name: DataTypes.STRING
  }, {})
  Candidate.associate = function (models) {
    Candidate.belongsTo(models.election)
  }
  return Candidate
}
