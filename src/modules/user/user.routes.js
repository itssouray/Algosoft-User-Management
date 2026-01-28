const express = require('express');
const validate = require('../../shared/middlewares/validate.middleware');
const authMiddleware = require('../../shared/middlewares/auth.middleware');
const roleMiddleware = require('../../shared/middlewares/role.middleware');
const { updateUserStatusSchema } = require('./user.validation');
const { getMyProfile, getAllUsers, updateUserStatus } = require('./user.controller');

const router = express.Router();


router.get(
     '/me',
     authMiddleware,
     getMyProfile
);


router.get(
     '/get-all',
     authMiddleware,
     roleMiddleware('ADMIN'),
     getAllUsers
);

router.patch(
     '/update-status/:id',
     authMiddleware,
     roleMiddleware('ADMIN'),
     validate({ body: updateUserStatusSchema }),
     updateUserStatus
);

module.exports = router;
