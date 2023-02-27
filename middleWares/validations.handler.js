const boom = require('@hapi/boom');

const validatorHandler = (schema, property) => {
  // Closure implementation
  return (req, res, next) => {
    //Gets data dynamically from params, query params or body, from whatever it comes
    const data = req[property];
    const { error } = schema.validate(data, {
      abortEarly: false
    });
    if(error){
      next(boom.badRequest(error));
    }
    next();
  }
}

module.exports = {
  validatorHandler,
}
