const { z } = require('zod');
const { SUBSCRIPTION_PLANS } = require('../../shared/constants/subscription.constants');


const createSubscriptionSchema = z.object({
     plan: z.enum(Object.keys(SUBSCRIPTION_PLANS)),
});


const updateSubscriptionPlanSchema = z.object({
     plan: z.enum(Object.keys(SUBSCRIPTION_PLANS)),
});

module.exports = {
     createSubscriptionSchema,
     updateSubscriptionPlanSchema,
};
