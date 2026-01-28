const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    addressLine1: {
      type: String,
      required: true,
      trim: true,
    },

    addressLine2: {
      type: String,
      trim: true,
      default: '',
    },

    city: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    state: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    country: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    zipCode: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    isPrimary: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);


addressSchema.index(
  { user: 1, isPrimary: 1 },
  { partialFilterExpression: { isPrimary: true } }
);

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;
