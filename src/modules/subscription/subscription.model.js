const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    plan: {
      type: String,
      enum: [
        'FREE',
        'SPONSORED',
        'MONTHLY',
        'QUARTERLY',
        'HALF_YEARLY',
        'YEARLY',
      ],
      required: true,
    },

    status: {
      type: String,
      enum: ['ACTIVE', 'CANCELLED', 'EXPIRED'],
      default: 'ACTIVE',
      index: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);


subscriptionSchema.index(
  { user: 1, status: 1 },
  { partialFilterExpression: { status: 'ACTIVE' } }
);

const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;
