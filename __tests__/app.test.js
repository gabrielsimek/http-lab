const request = require('supertest');
const app = require('../lib/app');

describe.only('app routes', () => {
  it('gets "hi" from / ', async() => {
    const res = await request(app).get('/');
  
    expect(res.text).toEqual('hi');
  });

  it.only('returns status 200 and plain text req body at post /echo', async() => {
    const res = await request(app)
      .post('/echo')
      .send('hello');
    expect(res.status).toBe(200);
    expect(res.text).toEqual('hello');
  });
});
  
