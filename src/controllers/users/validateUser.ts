import Joi from "joi";

const UserSchema = Joi.object({
  firstName: Joi.string().required().min(2).max(100),
  lastName: Joi.string().required().min(2).max(100),
  contact: Joi.object({
    city: Joi.string().required().min(2).max(100),
    street: Joi.string().required().min(2).max(100),
    postalCode: Joi.string().regex(/^[0-9]{2}-[0-9]{3}$/),
    phone: Joi.string().regex(/^\+48\d{9}$/),
  }),
});

const validateUser = (user: unknown) => {
  const result = UserSchema.validate(user, {
    allowUnknown: false,
    convert: true,
    abortEarly: false,
  });

  return result?.error?.message;
};

export default validateUser;
