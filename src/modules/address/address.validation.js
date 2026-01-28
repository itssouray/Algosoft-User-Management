const { z } = require('zod');


const addressFields = {
     addressLine1: z
          .string()
          .min(3, 'Address line 1 is required')
          .max(200),

     addressLine2: z
          .string()
          .max(200)
          .optional(),

     city: z
          .string()
          .min(2, 'City is required')
          .max(100),

     state: z
          .string()
          .min(2, 'State is required')
          .max(100),

     country: z
          .string()
          .min(2, 'Country is required')
          .max(100),

     zipCode: z
          .string()
          .min(3, 'Zip code is required')
          .max(20),

     isPrimary: z.boolean().optional(),
};


const createAddressSchema = z.object({
     ...addressFields,
});


const updateAddressSchema = z.object({
     addressLine1: addressFields.addressLine1.optional(),
     addressLine2: addressFields.addressLine2,
     city: addressFields.city.optional(),
     state: addressFields.state.optional(),
     country: addressFields.country.optional(),
     zipCode: addressFields.zipCode.optional(),
     isPrimary: addressFields.isPrimary,
});


const addressFilterSchema = z.object({
     city: z.string().optional(),
     state: z.string().optional(),
     country: z.string().optional(),
     zipCode: z.string().optional(),
     isPrimary: z.coerce.boolean().optional(),

     page: z
          .string()
          .transform(Number)
          .optional(),

     limit: z
          .string()
          .transform(Number)
          .optional(),

     sortBy: z
          .enum(['city', 'state'])
          .optional(),

     order: z
          .enum(['asc', 'desc'])
          .optional(),
});

module.exports = {
     createAddressSchema,
     updateAddressSchema,
     addressFilterSchema,
};
