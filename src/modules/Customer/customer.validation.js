const Joi = require('joi');

const customerValidation = async (req, res, next) => {
    // 1. Joi Schema Define Karein
    const schema = Joi.object({
        CustomerCode: Joi.string().trim().required().messages({
            'string.empty': 'CustomerCode is required',
            'any.required': 'CustomerCode is required'
        }),

        CustomerName: Joi.string().trim().required().messages({
            'string.empty': 'CustomerName is required',
            'any.required': 'CustomerName is required'
        }),

        Email: Joi.string().email().optional().messages({
            'string.email': 'Invalid email format'
        }),

        MobileNo: Joi.string().pattern(/^\d{10}$/).required().messages({
            'string.pattern.base': 'MobileNo must be a valid 10 digit number',
            'any.required': 'MobileNo is required'
        }),
        
        Pincode: Joi.string().pattern(/^\d{6}$/).optional().messages({
            'string.pattern.base': 'Pincode must be a valid 6 digit number'
        })
    });

    // 2. Validate req.body
    // abortEarly: false ensures ki saare validation errors ek saath return ho
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        const errors = error.details.map(detail => detail.message);
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors
        });
    }

    next();
};



module.exports = {
    customerValidation
};






// const customerValidation = async(req , res , next)=>{
//     const {CustomerCode,
//         CustomerName,
//         Email,
//         MobileNo,
//         Pincode} = req.body

//         const errors = [];

//          // Customer Code
//     if (!CustomerCode || CustomerCode.trim() === "") {
//         errors.push("CustomerCode is required");
//     }

//        // Customer Name
//     if (!CustomerName || CustomerName.trim() === "") {
//         errors.push("CustomerName is required");
//     }

//     // Mobile Number
//     if (!MobileNo || !/^\d{10}$/.test(MobileNo)) {
//         errors.push("MobileNo must be a valid 10 digit number");
//     }

//     // Email
//     if (
//         Email &&
//         !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email)
//     ) {
//         errors.push("Invalid email format");
//     }

//     // Pincode
//     if (
//         Pincode &&
//         !/^\d{6}$/.test(Pincode)
//     ) {
//         errors.push("Pincode must be a valid 6 digit number");
//     }

//     if (errors.length > 0) {
//         return res.status(400).json({
//             success: false,
//             message: "Validation failed",
//             errors
//         });
//     }

//     next();
// }

// module.exports = {
//     customerValidation
// };