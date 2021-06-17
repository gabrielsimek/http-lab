const fsPromises = require('fs/promises');
// const fs = require('fs');
// const file = '/index.html';


async function getFile(fileName){
  return await fsPromises.readFile(`./public${fileName}`, 'utf-8');
}

// getFile(file).then((content) => console.log(content)).catch(err => console.error(err.message));


// fsPromises.readFile(`./public${file}`, 'utf-8')
//   .then(content => console.log('promise', content))
//   .catch(err => console.error(err));

// //why is the cb, promise async...
// fs.readFile(`./public${file}`, 'utf-8', (err, content) => {
//   if(err){
//     console.error(err);
//   }
//   console.log('callback', content);
// });

module.exports = getFile;
