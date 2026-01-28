const Subscription = require('./subscription.model');
const { SUBSCRIPTION_PLANS } = require('../../shared/constants/subscription.constants');


const calculateEndDate = (plan) => {
     const planConfig = SUBSCRIPTION_PLANS[plan];

     if (!planConfig || planConfig.durationInDays === null) {
          return null;
     }

     const endDate = new Date();
     endDate.setDate(endDate.getDate() + planConfig.durationInDays);
     return endDate;
};


const applyExpiryIfNeeded = async (subscription) => {
     if (
          subscription.status === 'ACTIVE' &&
          subscription.endDate &&
          subscription.endDate < new Date()
     ) {
          subscription.status = 'EXPIRED';
          await subscription.save();
     }

     return subscription;
};


const createSubscription = async (userId, plan) => {

     const existing = await Subscription.findOne({
          user: userId,
          status: 'ACTIVE',
     });

     if (existing) {
          const error = new Error('User already has an active subscription');
          error.statusCode = 400;
          throw error;
     }

     const startDate = new Date();
     const endDate = calculateEndDate(plan);

     const subscription = await Subscription.create({
          user: userId,
          plan,
          status: 'ACTIVE',
          startDate,
          endDate,
     });

     return subscription;
};


const getMySubscription = async (userId) => {
     const subscription = await Subscription.findOne({
          user: userId,
          status: 'ACTIVE',
     });

     if (!subscription) {
          return { subscription: null, message: 'You dont have any active subscription' };
     }

     await applyExpiryIfNeeded(subscription);

     if (subscription.status !== 'ACTIVE') {
          return null;
     }

     return subscription;
};


const updateSubscriptionPlan = async (userId, newPlan) => {
     const subscription = await Subscription.findOne({
          user: userId,
          status: 'ACTIVE',
     });

     if (!subscription) {
          const error = new Error('No active subscription found');
          error.statusCode = 400;
          throw error;
     }

     subscription.plan = newPlan;
     subscription.startDate = new Date();
     subscription.endDate = calculateEndDate(newPlan);

     await subscription.save();

     return subscription;
};


const cancelSubscription = async (userId) => {
     const subscription = await Subscription.findOne({
          user: userId,
          status: 'ACTIVE',
     });

     if (!subscription) {
          const error = new Error('No active subscription to cancel');
          error.statusCode = 400;
          throw error;
     }

     subscription.status = 'CANCELLED';
     await subscription.save();

     return subscription;
};



const getAllSubscriptions = async () => {
     return Subscription.find().populate('user', 'name email role');
};

module.exports = {
     createSubscription,
     getMySubscription,
     updateSubscriptionPlan,
     cancelSubscription,
     getAllSubscriptions,
};
