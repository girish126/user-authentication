const Joi = require('joi');

/**
 * Middleware to validate signup input
 */
const signupValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required().messages({
      'string.base': 'Name must be a string',
      'string.empty': 'Name is required',
      'string.min': 'Name should be at least 3 characters long',
      'string.max': 'Name should not exceed 100 characters',
      'any.required': 'Name is required'
    }),
    email: Joi.string().email().required().messages({
      'string.email': 'Please provide a valid email',
      'any.required': 'Email is required'
    }),
    password: Joi.string().min(4).max(100).required().messages({
      'string.min': 'Password must be at least 4 characters',
      'string.max': 'Password must not exceed 100 characters',
      'any.required': 'Password is required'
    })
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  next();
};

/**
 * Middleware to validate login input
 */
const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Please provide a valid email',
      'any.required': 'Email is required'
    }),
    password: Joi.string().min(4).max(100).required().messages({
      'string.min': 'Password must be at least 4 characters',
      'string.max': 'Password must not exceed 100 characters',
      'any.required': 'Password is required'
    })
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  next();
};

module.exports = { signupValidation, loginValidation };
