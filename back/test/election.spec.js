process.env.NODE_ENV = 'test'

const chai = require('chai')
const { describe, it, beforeEach } = require('mocha')
const { ElectionService } = require('../src/services')
const models = require('../src/models')

const expect = chai.expect

describe('Elections', () => {
  beforeEach(async function () {
    await models.election.destroy({
      where: {},
      truncate: true
    })
  })

  it('should save an election', async () => {
    // Arrange
    const election = { name: 'test election' }

    // Act
    const [error, createdElection] = await ElectionService.create(election)

    // Assert
    expect(error).not.to.exist
    expect(createdElection).to.exist
    const result = await models.election.findAll()
    expect(result.length).to.equal(1)
    const firstElection = result[ 0 ]
    expect(firstElection.name).to.equal(election.name)
  })
})
