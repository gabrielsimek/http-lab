const net = require('net');
const parseRequest = require('./utils/parseRequest');
const createResponse = require('./utils/createResponse');

const app = net.createServer(socket => {
  socket.on('data', data => {
    const request = parseRequest(data.toString());
    const { path, method } = request;

    function getHtmlPage(color) {return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h1>${color}</h1>
</body>
</html>`;}

    if(method === 'GET'){
      if(path === '/') {
        socket.write(createResponse({ body: 'hi', contentType: 'text/plain' }));
      } 

      else if(path === '/red') {
        const htmlPage = getHtmlPage('red');
        const response = createResponse({ 
          body: htmlPage });
        socket.write(response);
      }
      else if(path === '/green') {
        const htmlPage = getHtmlPage('green');
        const response = createResponse({ 
          body: htmlPage });
        socket.write(response);
      }
      else if(path === '/blue') {
        const htmlPage = getHtmlPage('blue');
        const response = createResponse({ 
          body: htmlPage });
        socket.write(response);
      }    else {
        const response = createResponse({ body: 'Not Found', status: '404 Not Found', contentType: 'text/plain' });
        socket.write(response);
      }
    }
    else if(method === 'POST'){
      if(path === '/echo') {
        const response = createResponse({ body: request.body, contentType: 'text/plain' });
        socket.write(response);
      }
      else {
        const response = createResponse({ body: 'Not Found', status: '404 Not Found', contentType: 'text/plain' });
        socket.write(response);
      }
    }
    else {
      const response = createResponse({ body: 'Not Found', status: '404 Not Found', contentType: 'text/plain' });
      socket.write(response);
    }
  
    socket.end();
  });
});

module.exports = app;
