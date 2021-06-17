const net = require('net');
const parseRequest = require('./utils/parseRequest');
const createResponse = require('./utils/createResponse');
const getFile = require('../asynchronousFun.js');
const fsPromises = require('fs/promises');
// const fs = require('fs');
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
      else if(path === '/index.html'){
        // return fs.readFile(`./public/${path}`, 'utf-8', (err, data) => {
        //   if(err) console.log(err);
        //   socket.write(createResponse({ body: data }));
        // });

        
        return fsPromises.readFile(`./public/${path}`, 'utf-8')
          ?.then(content => socket.write(createResponse({ body: content })))
          .catch(err => {
            console.log(err);
            socket.write(createResponse({ body: 'File Not Found', status: 404, contentType: 'text/plain' }));
          });

        // return getFile(path)
        //   .then(content => socket.write(createResponse({ body: content })))
        //   .catch((err) => {
        //     console.log(err);
        //     if(err.message.split(',')[0] === 'ENOENT: no such file or directory'){
        //       socket.write(createResponse({ body: 'File Not Found', status: 404, contentType: 'text/plain' }));
        //     }
        //   });
      }
      else if(path === '/styles.css'){
        return getFile(path)
          ?.then(content => socket.write(createResponse({ body: content })))
          .catch((err) => {
            console.log(err); 
            socket.write(createResponse({ body: 'File Not Found', status: 404, contentType: 'text/plain' }));     
          });
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
      }   
      //trying to mimic express static files      
    }
    else if(method === 'POST'){
      if(path === '/echo') {
        const response = createResponse({ body: request.body, contentType: 'text/plain' });
        socket.write(response);
      }

    }
    socket.end(createResponse({ body: 'Not Found', status: '404 Not Found', contentType: 'text/plain' }));
  });
});

module.exports = app;
