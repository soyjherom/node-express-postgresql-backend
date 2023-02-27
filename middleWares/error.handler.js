/* eslint-disable no-console */
const logErrors = (err, req, res, next) => {
  console.info('1. logErrors');
  console.error(err);
  next(err);
}

const errorHandler = (err, req, res, next) => {
  console.log('2. errorHandler');
  res.status(500)
  .json({
    message: err.message,
    stack: err.stack
  });
  next(err);
}

const boomErrorHandler = (err, req, res, next) => {
  console.log('3. boomErrorHandler');
  if(err.isBoom){
    const { output } = err;
    res.status(output.statusCode)
    .json(output.payload);
  }
  next(err);
}

module.exports = {
  logErrors,
  errorHandler,
  boomErrorHandler
};
