const Joi = require("joi");


const createTrackingValidation = Joi.object({

    Status: Joi.string()
        .trim()
        .required()
        .messages({
            "string.base": "Status must be a string",
            "any.required": "Status is required"
        }),

    Location: Joi.string()
        .trim()
        .max(150)
        .allow("", null)
        .messages({
            "string.base": "Location must be a string",
            "string.max": "Location cannot exceed 150 characters"
        }),

    Remarks: Joi.string()
        .trim()
        .max(500)
        .allow("", null)
        .messages({
            "string.base": "Remarks must be a string",
            "string.max": "Remarks cannot exceed 500 characters"
        })

}).options({
    abortEarly: false,
    allowUnknown: false
});


module.exports = {
    createTrackingValidation
};