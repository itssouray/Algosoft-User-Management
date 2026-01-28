const express = require('express');
const validate = require('../../shared/middlewares/validate.middleware');
const authMiddleware = require('../../shared/middlewares/auth.middleware');
const roleMiddleware = require('../../shared/middlewares/role.middleware');
const { updateUserStatusSchema } = require('./user.validation');
const { getMyProfile, getAllUsers, updateUserStatus } = require('./user.controller');

const router = express.Router();

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Get logged-in user profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logged-in user profile
 *       401:
 *         description: Unauthorized
 */

router.get(
     '/me',
     authMiddleware,
     getMyProfile
);

/**
 * @swagger
 * /users/get-all:
 *   get:
 *     summary: Admin - Get all users
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *       403:
 *         description: Forbidden
 */

router.get(
     '/get-all',
     authMiddleware,
     roleMiddleware('ADMIN'),
     getAllUsers
);


/**
 * @swagger
 * /users/update-status/{id}:
 *   patch:
 *     summary: Admin - Activate or deactivate a user
 *     tags: [User]
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
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [isActive]
 *             properties:
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: User status updated
 *       404:
 *         description: User not found
 */

router.patch(
     '/update-status/:id',
     authMiddleware,
     roleMiddleware('ADMIN'),
     validate({ body: updateUserStatusSchema }),
     updateUserStatus
);

module.exports = router;
