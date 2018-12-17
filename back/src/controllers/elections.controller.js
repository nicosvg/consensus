const election = require('../models').election
const { ElectionService } = require('../services')

const create = async (req, res) => {
  const [error, created] = await ElectionService.create({ name: req.body.name })
  if (error) {
    return res.status(400).send(error)
  } else {
    res.status(201).send(created)
  }
}

const findAll = function (req, res) {
  return election.findAll()
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
