const handleGlobalError = (err, _req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    errors: err.errors,
  });
};

module.exports = handleGlobalError; 