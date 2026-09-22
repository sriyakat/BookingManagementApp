const trackingRepository = require("./bookingTracking.repository");
const AppError = require("../../../utils/App.Error");

//ALLOWED STATUS FLOW=====================
const statusFlow = {
    BOOKED: ["PICKED_UP"],
    PICKED_UP: ["IN_TRANSIT"],
    IN_TRANSIT: ["ARRIVED_AT_HUB"],
    ARRIVED_AT_HUB: ["OUT_FOR_DELIVERY"],
    OUT_FOR_DELIVERY: ["DELIVERED", "FAILED"],
    FAILED: ["OUT_FOR_DELIVERY", "RTO"],
    RTO: [],
    DELIVERED: []
};


//CREATE TRACKING ===================================
const createTracking = async (data, userId) => {

    const booking = await trackingRepository.getBookingById(data.BookingId);

    if (!booking) {
        throw new AppError("Booking not found", 404);
    }

    //Current booking status
    const currentStatus = booking.Status;

    //New status
    const newStatus = data.Status;

    //Allowed next statuses
    const allowedStatuses = statusFlow[currentStatus];

    //Check status transition
    if (!allowedStatuses || !allowedStatuses.includes(newStatus)) {

        throw new AppError(
            `Invalid status transition: ${currentStatus} → ${newStatus}`,
            400
        );
    }

    //User ID from JWT
    data.UpdatedBy = userId;

    const result = await trackingRepository.createTracking(data);

    return result;
};


//CREATE TRACKING===================================
const createBooking = async(data , userId)=>{
    const booking = await trackingRepository.getTrackingById(data.BookingId);

    if(!booking){
        throw new AppError("Booking Not Found", 404);
    }

     //Current status check karna=====================
     const currentStatus  = booking.status;

     // Requested new status
     const newStatus = data.status;

     // Check: status transition allowed hai ya nahi
     const allowedStatuses = statusFlow[currentStatus];

     if(!allowedStatuses){
        throw new AppError(`Invalid current booking status ${currentStatus}`);
     }

     if(!allowedStatuses.includes(newStatus)){
        throw new AppError(`Can not change status from ${currentStatus} to ${newStatus}`)
     }

     //UpdatedBy client se nahi lenge, JWT se authenticated user ki ID lenge
     data.UpdatedBy = userId;

     return await trackingRepository.createTracking(data);

}


//GET TRACKING BY BOOKING ID===============================
const getTrackingByBookingId = async(bookingId)=>{
    const booking = await trackingRepository.getBookingById(bookingId);

    if(!booking){
        throw new AppError("Booking Id not Found", 404);
    }

    const result = await trackingRepository.getTrackingByBookingId(bookingId);
    return result;

}


//GET TRACKING BY AWB =================================
const getTrackingByAWB = async(AwbNo)=>{
    if(!AwbNo){
        throw new Error ("Please enter valid AwbNo.")
    }

    const result = await trackingRepository.getTrackingByAWB(AwbNo);

    return result;
}


// GET ALL TRACKING=======================
const getTracking =async()=>{
    return await trackingRepository.getTracking()
}


// GET TRACKING BY ID=============================
const getTrackingById = async(trackingId)=>{
   const result = await trackingRepository.getTrackingById(trackingId);
  

   if(!result || result.length === 0){
    throw new AppError("Tracking record Not found", 404)
   }
    return result[0];
}


//DELETE TACKING===================================
const deleteTracking = async(trackingId)=>{
    const result = await trackingRepository.deleteTracking(trackingId);
    return result;
}




module.exports= {
    createTracking,
    createBooking,
    getTracking,
    getTrackingById,
    deleteTracking,
    getTrackingByBookingId,
    getTrackingByAWB,

}