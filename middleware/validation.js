import Joi from "joi";

export const validateSignup = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  next();
};

const validateLivre = (req, res, next) => {
    const { error } = livreSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
  

export const validateEvent = (req, res, next) => {
    const schema = Joi.object({
      title: Joi.string().required(),
      startDate: Joi.date().required(),
      endDate: Joi.date().greater(Joi.ref("startDate")).required(),
    });
  
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
  
    next();
  };
  
