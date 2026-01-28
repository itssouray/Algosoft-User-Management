const {
     createAddress,
     getMyAddresses,
     updateAddress,
     deleteAddress,
     searchAddresses,
} = require('./address.service');


const createAddressController = async (req, res, next) => {
     try {
          const userId = req.user.userId;

          const address = await createAddress(userId, req.body);

          res.status(201).json({
               message: 'Address added successfully',
               data: address,
          });
     } catch (error) {
          next(error);
     }
};


const getMyAddressesController = async (req, res, next) => {
     try {
          const userId = req.user.userId;

          const addresses = await getMyAddresses(userId);

          res.status(200).json({
               data: addresses,
          });
     } catch (error) {
          next(error);
     }
};


const updateAddressController = async (req, res, next) => {
     try {
          const userId = req.user.userId;
          const addressId = req.params.id;

          const address = await updateAddress(userId, addressId, req.body);

          res.status(200).json({
               message: 'Address updated successfully',
               data: address,
          });
     } catch (error) {
          next(error);
     }
};


const deleteAddressController = async (req, res, next) => {
     try {
          const userId = req.user.userId;
          const addressId = req.params.id;

          const address = await deleteAddress(userId, addressId);

          res.status(200).json({
               message: 'Address deleted successfully',
               data: address,
          });
     } catch (error) {
          next(error);
     }
};


const searchAddressesController = async (req, res, next) => {
     try {
          const result = await searchAddresses(req.query);

          res.status(200).json(result);
     } catch (error) {
          next(error);
     }
};

module.exports = {
     createAddress: createAddressController,
     getMyAddresses: getMyAddressesController,
     updateAddress: updateAddressController,
     deleteAddress: deleteAddressController,
     searchAddresses: searchAddressesController,
};
