const fsPromises = require('fs/promises');

async function getFile(fileName){
  return await fsPromises.readFile(`./public${fileName}`, 'utf-8');
}
//eslint-disable-next-line no-console
getFile('/index.html').then((content) => console.log(content)).catch(err => console.error(err.message));
