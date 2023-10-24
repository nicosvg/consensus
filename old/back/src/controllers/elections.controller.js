const { ElectionService } = require('../services')

const create = async (req, res) => {
  const [ error, created ] = await ElectionService.create(req.body)
  if (error) {
    return res.status(400).send(error)
  } else {
    res.status(201).send(created)
  }
}

const findAll = async (req, res) => {
  const [ error, electionsList ] = await ElectionService.findAll()
  if (error) {
    return res.status(500).send(error)
  } else {
    res.status(200).send(electionsList)
  }
}

const findOne = async (req, res) => {
  console.log('req params', req.params)
  const [ error, election ] = await ElectionService.findOne(req.params.id)
  if (error) {
    return res.status(500).send(error)
  } else {
    res.status(201).send(election)
  }
}

module.exports = {
  create,
  findAll,
  findOne
}
