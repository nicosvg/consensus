const models = require('../models')
const uuid = require('uuid')

const create = function (election) {
  election.id = uuid()
  return models.election
    .create(election)
    .then(result => {
      return [null, result]
    })
    .catch(error => {
      console.log('Error while saving election', error)
      return [error]
    })
}

const findAll = function (req, res) {
  return models.election.findAll()
    .then(election => res.status(200).send(election))
    .catch(error => {
      console.error('Failed to find all elections', error)
      res.status(500).send(error)
    })
}

module.exports = {
  create,
  findAll
}
