const Joi = require("@hapi/joi");

const validation = data => {
  const schema = {
    name: Joi.string()
      .min()
      .required(),
    text: Joi.string().required(),
    id: Joi.string()
      .min(5)
      .required(),
  };

  return Joi.validate(data, schema);
};

module.export = validation;
