const {
     getUserById,
     getAllUsers,
     updateUserStatus,
} = require('./user.service');


const getMyProfile = async (req, res, next) => {
     try {
          const user = await getUserById(req.user.userId);

          res.status(200).json({
               data: user,
          });
     } catch (error) {
          next(error);
     }
};



const getAllUsersController = async (req, res, next) => {
     try {
          const users = await getAllUsers();

          res.status(200).json({
               count: users.length,
               data: users,
          });
     } catch (error) {
          next(error);
     }
};

const updateUserStatusController = async (req, res, next) => {
     try {
          const { id } = req.params;
          const { isActive } = req.body;

          const result = await updateUserStatus(id, isActive);

          res.status(200).json({
               message: 'User status updated successfully',
               data: result,
          });
     } catch (error) {
          next(error);
     }
};

module.exports = {
     getMyProfile,
     getAllUsers: getAllUsersController,
     updateUserStatus: updateUserStatusController,
};
