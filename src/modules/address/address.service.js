const Address = require('./address.model');


const unsetPrimaryAddress = async (userId) => {
     await Address.updateMany(
          { user: userId, isPrimary: true },
          { isPrimary: false }
     );
};


const createAddress = async (userId, data) => {
     if (data.isPrimary) {
          await unsetPrimaryAddress(userId);
     }

     const address = await Address.create({
          ...data,
          user: userId,
     });

     return address;
};


const getMyAddresses = async (userId) => {
     return Address.find({ user: userId }).sort({ createdAt: -1 });
};


const updateAddress = async (userId, addressId, data) => {
     const address = await Address.findOne({
          _id: addressId,
          user: userId,
     });

     if (!address) {
          const error = new Error('Address not found');
          error.statusCode = 404;
          throw error;
     }

     if (data.isPrimary) {
          await unsetPrimaryAddress(userId);
     }

     Object.assign(address, data);
     await address.save();

     return address;
};


const deleteAddress = async (userId, addressId) => {
     const address = await Address.findOneAndDelete({
          _id: addressId,
          user: userId,
     });

     if (!address) {
          const error = new Error('Address not found');
          error.statusCode = 404;
          throw error;
     }

     return address;
};


const searchAddresses = async (filters) => {
     const {
          city,
          state,
          country,
          zipCode,
          isPrimary,
          page = 1,
          limit = 10,
          sortBy = 'createdAt',
          order = 'desc',
     } = filters;

     const query = {};

     if (city) query.city = { $regex: city, $options: 'i' };
     if (state) query.state = { $regex: state, $options: 'i' };
     if (country) query.country = { $regex: country, $options: 'i' };
     if (zipCode) query.zipCode = zipCode;
     if (typeof isPrimary === 'boolean') query.isPrimary = isPrimary;

     const skip = (page - 1) * limit;
     const sortOrder = order === 'asc' ? 1 : -1;

     const [data, total] = await Promise.all([
          Address.find(query)
               .populate('user', 'name email')
               .sort({ [sortBy]: sortOrder })
               .skip(skip)
               .limit(limit),
          Address.countDocuments(query),
     ]);

     return {
          total,
          page,
          limit,
          data,
     };
};

module.exports = {
     createAddress,
     getMyAddresses,
     updateAddress,
     deleteAddress,
     searchAddresses,
};
