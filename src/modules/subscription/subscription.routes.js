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


router.post(
     '/buy',
     authMiddleware,
     validate({ body: createSubscriptionSchema }),
     createSubscription
);


router.get(
     '/my',
     authMiddleware,
     getMySubscription
);


router.patch(
     '/update-plan',
     authMiddleware,
     validate({ body: updateSubscriptionPlanSchema }),
     updateSubscriptionPlan
);


router.patch(
     '/cancel',
     authMiddleware,
     cancelSubscription
);



router.get(
     '/get-all',
     authMiddleware,
     roleMiddleware('ADMIN'),
     getAllSubscriptions
);

module.exports = router;
