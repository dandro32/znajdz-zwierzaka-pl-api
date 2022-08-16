import Joi from "joi";

const AuthSchema = Joi.object({
  username: Joi.string().required().min(3).max(100),
  email: Joi.string().email({ tlds: { allow: false } }),
  password: Joi.string()
    .required()
    .min(8)
    .max(100)
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
});

const validateAuthCredentials = (user: unknown) => {
  const result = AuthSchema.validate(user, {
    allowUnknown: false,
    convert: true,
    abortEarly: false,
  });

  return result?.error?.message;
};

export default validateAuthCredentials;
