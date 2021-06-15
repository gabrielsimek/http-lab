module.exports = rawRequest => {
  const parsedRequest = {};
  const [method, path] = rawRequest.split(' ');

  parsedRequest.method = method;
  parsedRequest.path = path;

  if(rawRequest.split('\r').length > 1){
    const [body] = rawRequest.split('\n').slice(-1);
    parsedRequest.body = body;
  }
  return parsedRequest;
};

