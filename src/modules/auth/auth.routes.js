const express = require('express');
const validate = require('../../shared/middlewares/validate.middleware');
const { registerSchema, loginSchema } = require('./auth.validation');
const { register, login } = require('./auth.controller');

const router = express.Router();


router.post(
  '/register',
  validate({ body: registerSchema }),
  register
);


router.post(
  '/login',
  validate({ body: loginSchema }),
  login
);

module.exports = router;
