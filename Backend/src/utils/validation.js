import Joi from "joi";

// User validation schemas
const signUpSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required().messages({
    "string.empty": "Username is required",
    "string.min": "Username must be at least 3 characters",
    "string.max": "Username cannot exceed 30 characters",
  }),
  email: Joi.string()
    .email()
    .lowercase()
    .required()
    .messages({
      "string.email": "Email must be valid",
      "string.empty": "Email is required",
    }),
  password: Joi.string()
    .min(8)
    .required()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .messages({
      "string.min": "Password must be at least 8 characters",
      "string.empty": "Password is required",
      "string.pattern.base":
        "Password must contain uppercase, lowercase, and numbers",
    }),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")).messages({
    "any.only": "Passwords do not match",
  }),
  mobile: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .messages({
      "string.pattern.base": "Mobile number must be 10 digits",
    })
    .optional(),
});

const signInSchema = Joi.object({
  email: Joi.string()
    .email()
    .lowercase()
    .required()
    .messages({
      "string.email": "Email must be valid",
      "string.empty": "Email is required",
    }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
  }),
});

const validateSignUp = (data) => {
  return signUpSchema.validate(data, { abortEarly: false });
};

const validateSignIn = (data) => {
  return signInSchema.validate(data, { abortEarly: false });
};

export { validateSignUp, validateSignIn };
