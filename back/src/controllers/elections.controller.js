const election = require('../models').election
const uuid = require('uuid')

module.exports = {
  create (req, res) {
    return election
      .create({
        id: uuid(),
        name: req.body.name
      })
      .then(election => res.status(201).send(election))
      .catch(error => res.status(400).send(error))
  },
  findAll (req, res) {
    return election.findAll()
      .then(election => res.status(200).send(election))
      .catch(error => res.status(500).send(error))
  }
}
