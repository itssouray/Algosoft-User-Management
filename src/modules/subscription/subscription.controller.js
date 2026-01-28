const {
     createSubscription,
     getMySubscription,
     updateSubscriptionPlan,
     cancelSubscription,
     getAllSubscriptions,
} = require('./subscription.service');


const createSubscriptionController = async (req, res, next) => {
     try {
          const { plan } = req.body;
          const userId = req.user.userId;

          const subscription = await createSubscription(userId, plan);

          res.status(201).json({
               message: 'Subscription created successfully',
               data: subscription,
          });
     } catch (error) {
          next(error);
     }
};


const getMySubscriptionController = async (req, res, next) => {
     try {
          const userId = req.user.userId;

          const subscription = await getMySubscription(userId);

          res.status(200).json({
               data: subscription,
          });
     } catch (error) {
          next(error);
     }
};


const updateSubscriptionPlanController = async (req, res, next) => {
     try {
          const { plan } = req.body;
          const userId = req.user.userId;

          const subscription = await updateSubscriptionPlan(userId, plan);

          res.status(200).json({
               message: 'Subscription plan updated successfully',
               data: subscription,
          });
     } catch (error) {
          next(error);
     }
};


const cancelSubscriptionController = async (req, res, next) => {
     try {
          const userId = req.user.userId;

          const subscription = await cancelSubscription(userId);

          res.status(200).json({
               message: 'Subscription cancelled successfully',
               data: subscription,
          });
     } catch (error) {
          next(error);
     }
};


const getAllSubscriptionsController = async (req, res, next) => {
     try {
          const subscriptions = await getAllSubscriptions();

          res.status(200).json({
               count: subscriptions.length,
               data: subscriptions,
          });
     } catch (error) {
          next(error);
     }
};


module.exports = {
     createSubscription: createSubscriptionController,
     getMySubscription: getMySubscriptionController,
     updateSubscriptionPlan: updateSubscriptionPlanController,
     cancelSubscription: cancelSubscriptionController,
     getAllSubscriptions: getAllSubscriptionsController,
};
