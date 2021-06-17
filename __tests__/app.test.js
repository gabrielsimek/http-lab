const request = require('supertest');
const app = require('../lib/app');
const fsPromises = require('fs/promises');
describe('app routes', () => {
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
  <h1>red</h1>
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

  it('gets a html page with h1 and word blue from /blue', async() => {
    const res = await request(app)
      .get('/blue');

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
  <h1>blue</h1>
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

  it('returns a body of "not found" and a status of 404 if the requested get route does not exist', async() => {
    const res = await request(app).get('/yellow');
  
    expect(res.status).toBe(404);
    expect(res.text).toEqual('Not Found');
  });

  it('returns a body of "not found" and a status of 404 if the requested POST route does not exist', async() => {
    const res = await request(app)
      .post('/users')
      .send({ name: 'gabriel', email: 'gabriel@gabriel.com' });

    expect(res.status).toBe(404);
    expect(res.text).toEqual('Not Found');
  });
  
});
describe.only('file system', () => {
  it('gets an index html file', async() => {
    const res = await request(app).get('/index.html');
    const expected = await fsPromises.readFile('./public/index.html', 'utf-8');
    expect(res.status).toBe(200);

    expect(res.text).toEqual(expected);
  });
  it('responds with Not Found message if request file not found', async() => {
    const res = await request(app).get('/styles.css');
    
    expect(res.status).toBe(404);
    expect(res.text).toEqual('File Not Found');
  });
});
  
