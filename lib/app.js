const net = require('net');
const parseRequest = require('./utils/parseRequest');
const createResponse = require('./utils/createResponse');

const app = net.createServer(socket => {
  socket.on('data', data => {
    const request = parseRequest(data.toString());
    
    if(request.path === '/') {
      socket.write(createResponse({ body: 'hi', contentType: 'text/plain', status: 200 }));
    } 
    else if(request.path === '/echo') {
      const response = createResponse({ body: request.body, contentType: 'text/plain', status: 200 });
      socket.write(response);
    }
    else if(request.path === '/red') {
      const response = createResponse({ 
        body: `<!DOCTYPE html>
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
</html>`, 
        contentType: 'text/plain', 
        status: 200 });
      socket.write(response);
    }
    
//     else if(request.path === '/green') {
//       const response = createResponse({ 
//         body: `<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta http-equiv="X-UA-Compatible" content="IE=edge">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>Document</title>
// </head>
// <body>
//   <h1>Red</h1>
// </body>
// </html>`, 
//         contentType: 'text/plain', 
//         status: 200 });
//       socket.write(response);
//     }
    


    socket.end(createResponse({ body: 'Not Found', status: '404 Not Found', contentType: 'text/plain' }));
  });
});

module.exports = app;
