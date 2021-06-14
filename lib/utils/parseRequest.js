module.exports = rawRequest => {

  //   console.log(rawRequest.split(' '));
  const rawRequestArray = rawRequest.split('\n');
  const [method, path] = rawRequest.split(' ');
  
  if(rawRequestArray.length < 4) {
    return {
      method,
      path
    };
  } else {
    const [body] = rawRequestArray.slice(-1);
    return {
      method,
      path,
      body
    };
  }
};
