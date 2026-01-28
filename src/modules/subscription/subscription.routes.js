const express = require('express');

const authMiddleware = require('../../shared/middlewares/auth.middleware');
const roleMiddleware = require('../../shared/middlewares/role.middleware');
const validate = require('../../shared/middlewares/validate.middleware');

const {
     createSubscription,
     getMySubscription,
     updateSubscriptionPlan,
     cancelSubscription,
     getAllSubscriptions,
} = require('./subscription.controller');

const {
     createSubscriptionSchema,
     updateSubscriptionPlanSchema,
} = require('./subscription.validation');

const router = express.Router();


/**
 * @swagger
 * /subscription/buy:
 *   post:
 *     summary: Assign subscription to logged-in user
 *     tags: [Subscription]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [plan]
 *             properties:
 *               plan:
 *                 type: string
 *                 enum: [FREE, MONTHLY, QUARTERLY, HALF_YEARLY, YEARLY, SPONSORED]
 *     responses:
 *       201:
 *         description: Subscription assigned
 */

router.post(
     '/buy',
     authMiddleware,
     validate({ body: createSubscriptionSchema }),
     createSubscription
);

/**
 * @swagger
 * /subscription/my:
 *   get:
 *     summary: Get active subscription of logged-in user
 *     tags: [Subscription]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Active subscription
 */

router.get(
     '/my',
     authMiddleware,
     getMySubscription
);

/**
 * @swagger
 * /subscription/update-plan:
 *   patch:
 *     summary: Update subscription plan
 *     tags: [Subscription]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [plan]
 *             properties:
 *               plan:
 *                 type: string
 *     responses:
 *       200:
 *         description: Subscription updated
 */

router.patch(
     '/update-plan',
     authMiddleware,
     validate({ body: updateSubscriptionPlanSchema }),
     updateSubscriptionPlan
);

/**
 * @swagger
 * /subscription/cancel:
 *   patch:
 *     summary: Cancel active subscription
 *     tags: [Subscription]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Subscription cancelled
 */

router.patch(
     '/cancel',
     authMiddleware,
     cancelSubscription
);


/**
 * @swagger
 * /subscription/get-all:
 *   get:
 *     summary: Admin - View all user subscriptions
 *     tags: [Subscription]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of subscriptions
 */

router.get(
     '/get-all',
     authMiddleware,
     roleMiddleware('ADMIN'),
     getAllSubscriptions
);

module.exports = router;
