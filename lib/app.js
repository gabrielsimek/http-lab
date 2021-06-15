const net = require('net');
const parseRequest = require('./utils/parseRequest');
const createResponse = require('./utils/createResponse');

const app = net.createServer(socket => {
  socket.on('data', data => {
    const request = parseRequest(data.toString());
    
    if(request.path === '/'){
      socket.write(createResponse({ body: 'hi', contentType: 'text/plain', status: 200 }));
    } 
    else if(request.path === '/echo'){
      const response = createResponse({ body: request.body, contentType: 'text/plain', status: 200 });
      socket.write(response);
    }
    


    socket.end(createResponse({ body: 'Not Found', status: '404 Not Found', contentType: 'text/plain' }));
  });
});

module.exports = app;
