'use strict'
module.exports = (sequelize, DataTypes) => {
  const candidate = sequelize.define('candidate', {
    name: DataTypes.STRING
  }, {})
  candidate.associate = function (models) {
    // associations can be defined here
  }
  return candidate
}
