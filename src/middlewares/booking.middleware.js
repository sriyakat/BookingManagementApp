// VALIDATION MIDDLEWARE============================

// Joi schema ko validate karne ke liye

const validate = (schema, source = "body") => {
    return (req, res, next) => {
        // Request ke andar jis data ko validate karna hai, usko select karna
        const data = req[source];

        // Joi schema se validation
        const { error, value } = schema.validate(
            data,
            {
                abortEarly: false,
                stripUnknown: true
            }
        );
        // Agar validation fail hui
        if (error) {
            const errors = error.details.map((item) => {

                return item.message;
            });
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: errors
            });
        }
        // Validated data ko original request, location par wapas rakhna
        req[source] = value;

        // Next middleware/controller
        next();
    };
};



module.exports = validate;