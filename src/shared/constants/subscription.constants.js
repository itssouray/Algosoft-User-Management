const SUBSCRIPTION_PLANS = {
  FREE: {
    durationInDays: null,
    price: 0,
  },
  SPONSORED: {
    durationInDays: null,
    price: 0,
  },
  MONTHLY: {
    durationInDays: 30,
    price: 199,
  },
  QUARTERLY: {
    durationInDays: 90,
    price: 499,
  },
  HALF_YEARLY: {
    durationInDays: 180,
    price: 899,
  },
  YEARLY: {
    durationInDays: 365,
    price: 1599,
  },
};

module.exports = {
  SUBSCRIPTION_PLANS,
};
