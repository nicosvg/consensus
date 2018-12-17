const models = require('../models')
const uuid = require('uuid').v4

const create = function (election) {
  election.id = uuid()
  election.candidates.forEach(candidate => {
    candidate.id = uuid()
  })

  return models.election
    .create(election,
      { include: [models.candidate] })
    .then(result => {
      return [null, result]
    })
    .catch(error => {
      console.log('Error while saving election', error)
      return [error]
    })
}

const findAll = function (req, res) {
  return models.election
    .findAll({
      include: [{
        model: models.candidate,
        as: 'candidates'
      }]
    })
    .then(election => {
      return [null, election]
    })
    .catch(error => {
      console.error('Failed to find all elections', error)
      return [error]
    })
}

module.exports = {
  create,
  findAll
}
