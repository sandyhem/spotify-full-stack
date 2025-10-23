const request = require('supertest');
const {server,app} = require('../../server');
const { default: mongoose } = require('mongoose');


describe('GET /api/song/list', () => {
  it('should return 200', async () => {
    const res = await request(app).get('/api/song/list');
    expect(res.status).toBe(200);
  });

  // Uncomment if you want to test response body
  // it('should return object with songs', async () => {
  //   const res = await request(app).get('/api/song/list');
  //   expect(res.body).toHaveProperty('songs');
  // });
});

// Close connections after all tests
afterAll(async () => {
  await mongoose.connection.close();
  await server.close();
});
