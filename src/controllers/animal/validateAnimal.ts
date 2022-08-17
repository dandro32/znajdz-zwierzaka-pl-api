import Joi from "joi";

const animalSchema = Joi.object({
  additional: Joi.string().min(2).max(1024),
  color: Joi.string().min(2).max(100),
  location: Joi.object({
    longitude: Joi.string().required(),
    latitude: Joi.string().required(),
  }),
  race: Joi.string().min(2).max(100),
  title: Joi.string().required().min(2).max(255),
  type: Joi.string().required().min(2).max(100),
  userId: Joi.string().required(),
});

const validateAnimal = (user: unknown) => {
  const result = animalSchema.validate(user, {
    allowUnknown: false,
    convert: true,
    abortEarly: false,
  });

  return result?.error?.message;
};

export default validateAnimal;
