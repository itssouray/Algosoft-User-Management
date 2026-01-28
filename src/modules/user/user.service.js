const User = require('./user.model');
// const mongoose = require("mongoose");


const getUserById = async (userId) => {
     const user = await User.findById(userId).select('-password');

     if (!user) {
          const error = new Error('User not found');
          error.statusCode = 404;
          throw error;
     }

     return user;
};


const getAllUsers = async () => {
     return User.find().select('-password');
};


const updateUserStatus = async (userId, isActive) => {
     // console.log(typeof userId);
     const user = await User.findById(userId);

     if (!user) {
          const error = new Error('User not found');
          error.statusCode = 404;
          throw error;
     }

     user.isActive = isActive;
     await user.save();

     return {
          id: user._id,
          isActive: user.isActive,
     };
};

const getActiveUserById = async (userId) => {
     console.log(typeof userId);
     const user = await User.findById(userId);
     console.log("User data : ",user)
     if (!user) {
          console.log("inside")
          const error = new Error('User not found');
          error.statusCode = 401;
          throw error;
     }

     if (!user.isActive) {
          const error = new Error('User account is deactivated');
          error.statusCode = 403;
          throw error;
     }

     return user;
};

module.exports = {
     getUserById,
     getAllUsers,
     updateUserStatus,
     getActiveUserById
};
