import app from '../app'
import request from 'supertest'

const post = {
  id: '64394528f6291c191f95c711',
  title: 'Unit test'
}

const before = () => {
  beforeAll(async () => {
    await request(app).post('/post').send(post)
  })
}

const after = () => {
  afterAll(async () => {
    await request(app).delete(`/post/${post.id}`)
  })
}

describe('POST /post', () => {
  after()

  it('should return a new post', async () => {
    const { status } = await request(app).post('/post').send(post)

    expect(status).toBe(401)
  })
})

describe('GET /post', () => {
  before()
  after()

  it('should return all posts', async () => {
    const { status } = await request(app).get('/post')

    expect(status).toBe(401)
  })
})

describe('GET /post/:id', () => {
  before()
  after()

  it('should return one post', async () => {
    const { status } = await request(app).get(`/post/${post.id}`)

    expect(status).toBe(401)
  })
})

describe('PUT /post/:id', () => {
  before()
  after()

  it('should return updated post', async () => {
    const { status } = await request(app).put(`/post/${post.id}`).send({ title: '' })

    expect(status).toBe(401)
  })
})

describe('DELETE /post/:id', () => {
  before()

  it('should return deleted post', async () => {
    const { status } = await request(app).delete(`/post/${post.id}`)

    expect(status).toBe(401)
  })
})