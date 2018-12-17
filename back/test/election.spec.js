process.env.NODE_ENV = 'test'

const chai = require('chai')
// const { describe, it, beforeEach } = require('mocha')
const { ElectionService } = require('../src/services')
const models = require('../src/models')
const uuid = require('uuid').v4
const expect = chai.expect

describe('Elections', () => {
  beforeEach(async function () {
    await models.candidate.destroy({ where: {}, truncate: true })
    await models.election.destroy({ where: {}, truncate: true })
  })

  it('save election', async () => {
    // Arrange
    const election = {
      name: 'test election',
      candidates: [{
        name: 'the first candidate'
      }]
    }

    // Act
    const [error, createdElection] = await ElectionService.create(election)

    // Assert
    expect(error).not.to.exist
    expect(createdElection).to.exist
    const result = await models.election.findAll()
    expect(result.length).to.equal(1)
    const firstElection = result[0]
    expect(firstElection.name).to.equal(election.name)
    expect(firstElection.id).to.exist
    const candidates = await models.candidate.findAll()
    expect(candidates).to.have.lengthOf(1)
  })

  it('list elections', async () => {
    // Arrange
    const firstElection = await models.election.create({
      id: uuid(),
      name: 'list_test',
      candidates: [{
        id: uuid(),
        name: 'first candidate'
      }]
    }, { include: [models.candidate] })
    // Act
    const [error, list] = await ElectionService.findAll()
    // Assert
    expect(error).not.to.exist
    expect(list).to.exist
    expect(list.length).to.equal(1)
    const election = list[0]
    expect(election.name).to.equal(firstElection.name)
    expect(election.candidates).to.exist
    expect(election.candidates.length).to.equal(1)
  })
})
