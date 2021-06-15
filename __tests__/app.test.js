const request = require('supertest');
const app = require('../lib/app');

describe('app routes', () => {
  it.only('gets "hi" from / ', async() => {
    const res = await request(app).get('/');
  
    expect(res.text).toEqual('hi');
  });
});
  
