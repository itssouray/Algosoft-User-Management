const { registerUser, loginUser } = require('./auth.service');


const register = async (req, res, next) => {
     try {
          const user = await registerUser(req.body);

          res.status(201).json({
               message: 'User registered successfully',
               data: user,
          });
     } catch (error) {
          next(error);
     }
};


const login = async (req, res, next) => {
     try {
          const result = await loginUser(req.body);

          res.status(200).json(result);
     } catch (error) {
          next(error);
     }
};

module.exports = {
     register,
     login,
};
