const express = require('express');
const authRoutes = require('../modules/auth/auth.routes');
const userRoutes = require('../modules/user/user.routes');
const subscriptionRoutes = require('../modules/subscription/subscription.routes');
const addressRoutes = require('../modules/address/address.routes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/subscription',subscriptionRoutes);
router.use('/address', addressRoutes);

module.exports = router;
