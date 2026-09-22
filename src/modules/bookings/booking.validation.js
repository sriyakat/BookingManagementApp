const Joi = require("joi");


// CREATE BOOKING VALIDATION ======================== 
const createBookingSchema = Joi.object({

    CustomerId: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            "number.base": "CustomerId must be a number",
            "number.integer": "CustomerId must be an integer",
            "number.positive": "CustomerId must be greater than 0",
            "any.required": "CustomerId is required"
        }),

    // SENDER========================
    SenderName: Joi.string()
        .trim()
        .min(2)
        .max(150)
        .required(),

    SenderMobile: Joi.string()
        .trim()
        .pattern(/^[0-9]{10,15}$/)
        .required()
        .messages({
            "string.pattern.base":
            "SenderMobile must contain 10 to 15 digits"
        }),

    SenderEmail: Joi.string()
        .email()
        .max(150)
        .allow("", null),

    SenderAddress: Joi.string()
        .trim()
        .min(5)
        .max(500)
        .required(),

    SenderCountry: Joi.string()
        .trim()
        .max(100)
        .required(),

    SenderState: Joi.string()
        .trim()
        .max(100)
        .allow("", null),

    SenderCity: Joi.string()
        .trim()
        .max(100)
        .required(),

    SenderPincode: Joi.string()
        .trim()
        .max(20)
        .required(),

    // RECEIVER=============================
    ReceiverName: Joi.string()
        .trim()
        .min(2)
        .max(150)
        .required(),

    ReceiverMobile: Joi.string()
        .trim()
        .pattern(/^[0-9]{10,15}$/)
        .required()
        .messages({
            "string.pattern.base":
                "ReceiverMobile must contain 10 to 15 digits"
        }),

    ReceiverEmail: Joi.string()
        .email()
        .max(150)
        .allow("", null),

    ReceiverAddress: Joi.string()
        .trim()
        .min(5)
        .max(500)
        .required(),

    ReceiverCountry: Joi.string()
        .trim()
        .max(100)
        .required(),

    ReceiverState: Joi.string()
        .trim()
        .max(100)
        .allow("", null),

    ReceiverCity: Joi.string()
        .trim()
        .max(100)
        .required(),

    ReceiverPincode: Joi.string()
        .trim()
        .max(20)
        .required(),


    
    // SERVICE & PAYMENT=================
    ServiceType: Joi.string()
        .valid(
            "AIR",
            "SURFACE",
            "SEA",
            "EXPRESS"
        )
        .required(),

    PaymentType: Joi.string()
        .valid(
            "COD",
            "PREPAID",
            "CREDIT"
        )
        .required(),

    // AMOUNT=======================

    ChargeableWeight: Joi.number()
        .positive()
        .allow(null),

    TotalAmount: Joi.number()
        .min(0)
        .required(),


    // PIECES======================

    Pieces: Joi.array()
        .min(1)
        .items(

            Joi.object({

                Description: Joi.string()
                    .trim()
                    .max(500)
                    .allow("", null),

                Weight: Joi.number()
                    .positive()
                    .required(),

                Length: Joi.number()
                    .positive()
                    .allow(null),

                Width: Joi.number()
                    .positive()
                    .allow(null),

                Height: Joi.number()
                    .positive()
                    .allow(null)

            })

        )
        .required()

});


// UPDATE BOOKING VALIDATION=====================
// const updateBookingBodySchema = createBookingSchema;

// BOOKING PARAMS VALIDATION
const bookingParamsSchema = Joi.object({

    id: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            "number.base": "Booking ID must be a number",
            "number.integer": "Booking ID must be an integer",
            "number.positive": "Booking ID must be greater than 0",
            "any.required": "Booking ID is required"
        })

});


// const updateBookingSchema = createBookingSchema
//     .fork(
//         ["CustomerId"],
//         (schema) => schema.optional()
//     )
//     .keys({

//         BookingId: Joi.number()
//             .integer()
//             .positive()
//             .required()

//     });


// const updateBookingSchema = createBookingSchema.keys({

//     BookingId: Joi.number()
//         .integer()
//         .positive()
//         .required()
//         .messages({
//             "any.required": "BookingId is required"
//         })

// });




// GET BOOKING BY ID VALIDATION ==================


const bookingIdSchema = Joi.object({

    BookingId: Joi.number()
        .integer()
        .positive()
        .required()

});



module.exports = {
    createBookingSchema,
    createBookingSchema,
   // updateBookingBodySchema,
    bookingParamsSchema,
    bookingIdSchema
};