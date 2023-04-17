import app from '../app'
import request from 'supertest'

const user = {
  id: '643d5fa552bf5de6e35eeac8',
  name: 'Unit tester',
  email: 'unittester@test.com',
  password: 'UnitTester123!'
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

describe('GET /user', () => {
  before()
  after()

  it('should return all posts', async () => {
    const { body, status } = await request(app).get('/user')

    expect(status).toBe(200)
    expect(body.length >= 1).toBe(true)
  })
})

describe('GET /user/:id', () => {
  before()
  after()

  it('should return one user', async () => {
    const { body, status } = await request(app).get(`/user/${user.id}`)

    expect(status).toBe(200)
    expect(body.id).toBe(user.id)
  })
})

describe('PUT /user/:id', () => {
  before()
  after()

  it('should return updated user', async () => {
    const { body, status } = await request(app)
      .put(`/user/${user.id}`)
      .send({ name: 'updated' })

    expect(status).toBe(200)
    expect(body.name).toBe('updated')
  })
})

describe('DELETE /user/:id', () => {
  before()

  it('should return deleted user', async () => {
    const { body, status } = await request(app).delete(`/user/${user.id}`)

    expect(status).toBe(200)
    expect(body.id).toBe(user.id)
  })
})