const { ZodError } = require('zod');

const validate = (schemas) => {
  return (req, res, next) => {
    try {

      if (schemas.body) {
        req.body = schemas.body.parse(req.body);
      }


      if (schemas.params) {
        req.params = schemas.params.parse(req.params);
      }


      if (schemas.query) {
        req.query = schemas.query.parse(req.query);
      }

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: 'Validation failed',
          errors: error.errors.map((err) => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        });
      }

      next(error);
    }
  };
};

module.exports = validate;
