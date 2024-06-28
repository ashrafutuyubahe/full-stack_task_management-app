const Joi = require('joi');

const employeeSchema = Joi.object({
    title: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    position: Joi.string().required(),
    company: Joi.string().required(),
    business: Joi.string().required(),
    employees: Joi.string().required(),
    street: Joi.string().required(),
    additional: Joi.string().required(),
    zip: Joi.string().required(),
    place: Joi.string().required(),
    country: Joi.string().required(),
    code: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().email().required(),
    checkbox: Joi.boolean().required(),
  });


const validateEmployee = (req, res, next) => {
  const { error } = employeeSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errorMessage = error.details.map(detail => detail.message).join('; ');
    return res.status(400).send(errorMessage);
  }
  next();
};

module.exports = validateEmployee;
