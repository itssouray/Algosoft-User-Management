const express = require('express');

const authMiddleware = require('../../shared/middlewares/auth.middleware');
const roleMiddleware = require('../../shared/middlewares/role.middleware');
const validate = require('../../shared/middlewares/validate.middleware');

const {
  createAddress,
  getMyAddresses,
  updateAddress,
  deleteAddress,
  searchAddresses,
} = require('./address.controller');

const {
  createAddressSchema,
  updateAddressSchema,
  addressFilterSchema,
} = require('./address.validation');

const router = express.Router();


router.post(
  '/create',
  authMiddleware,
  validate({ body: createAddressSchema }),
  createAddress
);


router.get(
  '/my',
  authMiddleware,
  getMyAddresses
);


router.patch(
  '/update/:id',
  authMiddleware,
  validate({ body: updateAddressSchema }),
  updateAddress
);


router.delete(
  '/remove/:id',
  authMiddleware,
  deleteAddress
);


router.get(
  '/search',
  authMiddleware,
  roleMiddleware('ADMIN'),
  validate({ query: addressFilterSchema }),
  searchAddresses
);

module.exports = router;
