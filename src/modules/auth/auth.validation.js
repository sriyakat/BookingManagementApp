const Joi = require('joi');

//Register request validation===================================
const validateRegister = (req, res, next) => {
    const registerSchema = Joi.object({
        UserName: Joi.string().trim().required().messages({
            'string.empty': 'UserName is required',
            'any.required': 'UserName is required'
        }),
        Email: Joi.string().trim().email().required().messages({
            'string.empty': 'Email is required',
            'string.email': 'Invalid email format',
            'any.required': 'Email is required'
        }),
        Password: Joi.string().min(6).required().messages({
            'string.empty': 'Password is required',
            'string.min': 'Password must be at least 6 characters',
            'any.required': 'Password is required'
        }),
        MobileNo: Joi.string().pattern(/^\d{10}$/).required().messages({
            'string.empty': 'MobileNo is required',
            'string.pattern.base': 'MobileNo must be a valid 10 digit number',
            'any.required': 'MobileNo is required'
        }),
        RoleId: Joi.number().integer().required().messages({
            'number.base': 'Valid RoleId is required',
            'number.integer': 'Valid RoleId is required',
            'any.required': 'Valid RoleId is required'
        })
    });

    const { error } = registerSchema.validate(req.body, { abortEarly: false });

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


// Login request validation ===========================================
const validateLogin = (req, res, next) => {
    const loginSchema = Joi.object({
        Email: Joi.string().trim().email().required().messages({
            'string.empty': 'Email is required',
            'string.email': 'Invalid email format',
            'any.required': 'Email is required'
        }),
        Password: Joi.string().trim().required().messages({
            'string.empty': 'Password is required',
            'any.required': 'Password is required'
        })
    });

    const { error } = loginSchema.validate(req.body, { abortEarly: false });

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
    validateRegister,
    validateLogin
};





// //register request ke data ko validate karta hai
// const validateRegister = (req, res, next) => {

//     const {
//         UserName,
//         Email,
//         Password,
//         MobileNo,
//         RoleId
//     } = req.body;

//     const errors = [];

//     if (!UserName || UserName.trim() === "") {
//         errors.push("UserName is required");
//     }

//     if (!Email || Email.trim() === "") {
//         errors.push("Email is required");
//     }

//     if (
//         Email &&
//         !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email)
//     ) {
//         errors.push("Invalid email format");
//     }

//     if (!Password || Password.length < 6) {
//         errors.push("Password must be at least 6 characters");
//     }

//     if (
//         !MobileNo ||
//         !/^\d{10}$/.test(MobileNo)
//     ) {
//         errors.push("MobileNo must be a valid 10 digit number");
//     }

//     if (!RoleId || !Number.isInteger(Number(RoleId))) {
//         errors.push("Valid RoleId is required");
//     }

//     if (errors.length > 0) {
//         return res.status(400).json({
//             success: false,
//             message: "Validation failed",
//             errors
//         });
//     }

//     next();
// };


// // Login request ke data ko validate karta hai
// const validateLogin = (req, res, next) => {

//     // Request body se Email aur Password nikal rahe hain
//     const {
//         Email,
//         Password
//     } = req.body;

//     // Validation errors ko store karne ke liye empty array
//     const errors = [];

//     // Email check
//     if (!Email || Email.trim() === "") {
//         errors.push("Email is required");
//     }

//     // Email ka basic format check
//     if (
//         Email &&
//         !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email)
//     ) {
//         errors.push("Invalid email format");
//     }

//     // Password check
//     if (!Password || Password.trim() === "") {
//         errors.push("Password is required");
//     }

//     // Agar validation errors hain
//     if (errors.length > 0) {

//         // Request ko yahin stop kar do
//         return res.status(400).json({
//             success: false,
//             message: "Validation failed",
//             errors
//         });
//     }

//     // Validation successful hai,
//     // ab request ko controller ke paas bhejo
//     next();
// };



// module.exports = {
//     validateRegister,
//     validateLogin,
// };