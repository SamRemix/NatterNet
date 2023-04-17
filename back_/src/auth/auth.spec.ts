import app from '../app'
import request from 'supertest'

const user = {
  id: '643d66769fcf9d57b5864eea',
  name: 'Unit auth tester',
  email: 'unitauthtester@test.com',
  password: 'UnitAuthTester123!'
}

const before = () => {
  beforeAll(async () => {
    await request(app).post('/auth/sign-up').send(user)
  })
}

const after = () => {
  afterAll(async () => {
    await request(app).delete(`/user/${user.id}`)
  })
}

describe('POST /auth/sign-up', () => {
  after()

  it('should return a user', async () => {
    const { status } = await request(app)
      .post('/auth/sign-up')
      .send(user)

    expect(status).toBe(200)
  })
})

describe('POST /auth/log-in', () => {
  before()
  after()

  it('should return logged in user', async () => {
    const { status } = await request(app)
      .post('/auth/log-in')
      .send(user)

    expect(status).toBe(200)
  })
})