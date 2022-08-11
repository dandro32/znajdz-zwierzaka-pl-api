import Joi from "joi";

const UserSchema = Joi.object({
  username: Joi.string().required().min(3).max(100),
  password: Joi.string()
    .required()
    .min(8)
    .max(100)
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
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
