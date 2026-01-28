const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../user/user.model');
const { env } = require('../../config');


const registerUser = async ({ name, email, password }) => {

     const existingUser = await User.findOne({ email });
     if (existingUser) {
          const error = new Error('Email already registered');
          error.statusCode = 409;
          throw error;
     }


     const hashedPassword = await bcrypt.hash(password, 10);


     const user = await User.create({
          name,
          email,
          password: hashedPassword,
          role: email === env.adminEmail ? 'ADMIN' : 'USER'
     });

     return {
          id: user._id,
          name: user.name,
          email: user.email,
     };
};


const loginUser = async ({ email, password }) => {

     const user = await User.findOne({ email }).select('+password');

     if (!user) {
          const error = new Error('Invalid email or password');
          error.statusCode = 401;
          throw error;
     }


     if (!user.isActive) {
          const error = new Error('User account is deactivated');
          error.statusCode = 403;
          throw error;
     }


     const isPasswordValid = await bcrypt.compare(password, user.password);
     if (!isPasswordValid) {
          const error = new Error('Invalid email or password');
          error.statusCode = 401;
          throw error;
     }


     const token = jwt.sign(
          {
               userId: user._id,
               role: user.role,
               isActive: user.isActive,
          },
          env.jwt.secret,
          {
               expiresIn: env.jwt.expiresIn,
          }
     );

     return {
          accessToken: token,
     };
};

module.exports = {
     registerUser,
     loginUser,
};
