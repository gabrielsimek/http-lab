module.exports = ({ body, contentType, status }) => {
  const response = `HTTP/1.1 ${status}
Accept-Ranges: bytes
Content-Length: ${body.length}
Content-Type: ${contentType}\r
\r
${body}`;
  console.log(response);
  return response;
};
