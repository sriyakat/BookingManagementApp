const trackingService = require("./bookingTracking.service");


// CREATE TRACKING ======================================================
const createTracking = async (req, res, next) => {
    try {
        // URL se BookingId lena
        const bookingId = Number(req.params.id);

        // Request body ka data lena
        const data = {
            ...req.body,
            BookingId: bookingId
        };

        // JWT se logged-in user ki ID
        const userId = req.user.UserId;

        const result = await trackingService.getTracking(data, userId );

        return res.status(201).json({
            success: true,
            message: "Tracking status updated successfully",
            data: result
        });

    } catch (error) {
        next(error);
    }
};


//GET TRACKING BY BOOKING ID============================================
const getTrackingByBookingId = async(req , res , next)=>{
    try{
const bookingId = Number(req.params.id);
const result = await trackingService.getTrackingByBookingId(bookingId);

return res.status(200).json({
    success: true,
    message: "Booking Tracking Fetch successfully",
    data: result
});

    }catch(error){
        next(error)
    }
}


//GET TRACKING BY AWB NO. =======================================
const getTrackingByAWB =  async(req, res, next)=>{
    try{
const AwbNo = req.params.id;

const result = await trackingService.getTrackingByAWB(AwbNo);

return res.status(200).json({
    success: true,
    message:"Tracking fetch successfuly",
    data: result
});
    }catch(error){
        next(error)
    }
}


// GET ALL TRACKING ======================================================
const getTracking = async (req, res, next) => {
    try {
        const result = await trackingService.getTracking();

        return res.status(200).json({
            success: true,
            message: "Tracking records fetched successfully",
            data: result
        });

    } catch (error) {
        next(error);
    }
};


// GET TRACKING BY ID ======================================================
const getTrackingById = async (req, res, next) => {
    try {
        const trackingId = req.params.id;

        const result = await trackingService.getTrackingById(trackingId);

        return res.status(200).json({
            success: true,
            message: "Tracking record fetched successfully",
            data: result
        });

    } catch (error) {

        next(error);
    }
};


// DELETE TRACKING ======================================================
const deleteTracking = async (req, res, next) => {
    try {
        const trackingId = req.params.id;

        const result = await trackingService.deleteTracking(trackingId);

        return res.status(200).json({
            success: true,
            message: "Tracking record deleted successfully",
            data: result
        });

    } catch (error) {

        next(error);
    }
};



module.exports = {
    createTracking,
    getTracking,
    getTrackingById,
    deleteTracking,
    getTrackingByBookingId,
    getTrackingByAWB,
};