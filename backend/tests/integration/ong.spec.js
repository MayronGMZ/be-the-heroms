const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/conn')

describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback()
    await connection.migrate.latest()
  })

  afterAll(async () => {
    await connection.destroy()
  })

  it('should be able to create a new ONG', async () => {
    const response = await request(app)
      .post('/ongs')
      .send({
        name: "APAE2",
        email: "apae@gmail.com",
        whatsapp: "9888334455",
        city: "São Luís",
        uf: "MA",
      })

      expect(response.body).toHaveProperty('id')
      expect(response.body.id).toHaveLength(8)
  })
})