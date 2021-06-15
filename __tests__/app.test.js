const request = require('supertest');
const app = require('../lib/app');

describe.only('app routes', () => {
  it('gets "hi" from / ', async() => {
    const res = await request(app).get('/');
  
    expect(res.text).toEqual('hi');
  });

  it('returns status 200 and plain text req body at post /echo', async() => {
    const res = await request(app)
      .post('/echo')
      .send('hello');
    expect(res.status).toBe(200);
    expect(res.text).toEqual('hello');
  });
  it('gets a html page with h1 and word red from /red', async() => {
    const res = await request(app)
      .get('/red');

    expect(res.status).toBe(200);
    expect(res.text).toEqual(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h1>Red</h1>
</body>
</html>`);
  });
  it('gets a html page with h1 and word green from /green', async() => {
    const res = await request(app)
      .get('/green');

    expect(res.status).toBe(200);
    expect(res.text).toEqual(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h1>green</h1>
</body>
</html>`);
  });
});
  
