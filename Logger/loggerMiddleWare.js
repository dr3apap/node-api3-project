//custom middleware

function logger(req, res, next) {
  const method = req.method;
  const endPoint = req.originalUrl;
  console.log(`${method} to ${endPoint} at ${time}`);
  const date = new Date().toString();
  next();
}
module.exports = logger;
