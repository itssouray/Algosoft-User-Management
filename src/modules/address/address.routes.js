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

/**
 * @swagger
 * /address/create:
 *   post:
 *     summary: Add a new address
 *     tags: [Address]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [addressLine1, city, state, country, zipCode]
 *             properties:
 *               addressLine1:
 *                 type: string
 *               addressLine2:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               country:
 *                 type: string
 *               zipCode:
 *                 type: string
 *               isPrimary:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Address created
 */
router.post(
  '/create',
  authMiddleware,
  validate({ body: createAddressSchema }),
  createAddress
);

/**
 * @swagger
 * /address/my:
 *   get:
 *     summary: Get all addresses of logged-in user
 *     tags: [Address]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of addresses
 */

router.get(
  '/my',
  authMiddleware,
  getMyAddresses
);

/**
 * @swagger
 * /address/update/{id}:
 *   patch:
 *     summary: Update an address
 *     tags: [Address]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Address updated
 */

router.patch(
  '/update/:id',
  authMiddleware,
  validate({ body: updateAddressSchema }),
  updateAddress
);

/**
 * @swagger
 * /address/remove/{id}:
 *   delete:
 *     summary: Delete an address
 *     tags: [Address]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Address deleted
 */

router.delete(
  '/remove/:id',
  authMiddleware,
  deleteAddress
);

/**
 * @swagger
 * /address/search:
 *   get:
 *     summary: Admin - Filter addresses
 *     tags: [Address]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *       - in: query
 *         name: state
 *         schema:
 *           type: string
 *       - in: query
 *         name: country
 *         schema:
 *           type: string
 *       - in: query
 *         name: zipCode
 *         schema:
 *           type: string
 *       - in: query
 *         name: isPrimary
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [city, state]
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *     responses:
 *       200:
 *         description: Filtered address list
 */

router.get(
  '/search',
  authMiddleware,
  roleMiddleware('ADMIN'),
  validate({ query: addressFilterSchema }),
  searchAddresses
);

module.exports = router;
