const notFound = (msg = 'Resource not found') => {
  const error = new Error(msg);
  error.status = 404;
  error.code = 404;
  return error;
};

const badRequest = (msg = 'Bad Request') => {
  const error = new Error(msg);
  error.status = 400;
  error.code = 400;
  return error;
};

const serverError = (msg = 'Internal Server Error') => {
  const error = new Error(msg);
  error.status = 500;
  error.code = 500;
  return error;
};

const authenticationError = (msg = 'Authentication Failed') => {
  const error = new Error(msg);
  error.status = 401;
  error.code = 401;
  return error;
};

const authorizationError = (msg = 'Permission Denied') => {
  const error = new Error(msg);
  error.status = 403;
  error.code = 403;
  return error;
};

const conflictError = (msg = 'Conflict err') => {
  const error = new Error(msg);
  error.status = 409;
  error.statusCode = 409;

  return error;
};

module.exports = {
  notFound,
  badRequest,
  serverError,
  authenticationError,
  authorizationError,
  conflictError
};