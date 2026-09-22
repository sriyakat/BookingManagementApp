const bookingService = require("./booking.service");


// CREATE BOOKING=================================
const createBooking = async (req, res, next) => {
    try {
        // const data = req.body;
        const data = req.body;
        const userId = req.user.userId;  //jWT Authentication

        const result = await bookingService.createBooking( data,  userId );

        return res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: result
        });

    } catch (error) {
        next(error);
    }
};


// GET ALL BOOKINGS===================================
const getBookings = async(req , res , next)=>{
    try{
const result = await bookingService.getBookings();

return res.status(200).json({
    success: true,
    message: "Bookings fetched successfully",
    data: result
})

    }catch(error){
        next(error)
    }
}  


// GET BOOKINGS BY ID===================================
const getBookingById = async(req , res, next)=>{
    try{
const bookingId = req.params.id;

const result = await bookingService.getBookingById(
    bookingId
)

return res.status(200).json({
    success: true,
    message: "Booking fetched successfully",
    data: result
})

    }catch(error){
        next(error)
    }
}


//UPDATE BOOKINGS=======================================
const updateBooking = async (req , res, next)=>{
    try{
// Request body ko data variable mein store karna
        const data = req.body;

        // URL se BookingId lena
        data.BookingId = req.params.id;

         // Logged-in user
        const userId = req.user.userId;

        const result = await bookingService.updateBooking(
            data,
            userId
        );

        return res.status(200).json({
            success: true,
            message: "Booking Update Succesfully",
            data: result

        });

    }catch(error){
        next(error)
    }
}


//DELETE BOOKING=========================================
const deleteBooking = async (req, res, next)=>{
    try{
const bookingId = req.params.id;

 // Logged-in user ki ID
        const userId = req.user.userId;

 // Service ko delete request bhejna
const result = await bookingService.deleteBooking(
    bookingId,
    userId
);

return res.status(200).json({
    success: true,
    message: "Booking Deleted",
    data: result
})

    }catch(error){
        next(error)
    }
}


module.exports = {
    createBooking,
    getBookings,
    getBookingById,
    updateBooking,
    deleteBooking
}