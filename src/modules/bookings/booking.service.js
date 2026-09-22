const bookingRepository = require("./booking.repository");

 //CREATE BOOKING=======================================
  const createBooking = async(data , userId)=>{
    // Logged-in user ki ID, JWT middleware se service ko milegi
       data.CreatedBy = userId;

     // Service Type Validation
      const allowedServiceTypes = ["AIR", "SURFACE", "SEA", "EXPRESS"];

     if(!allowedServiceTypes.includes(data.ServiceType)){
        throw new Error("Invalid Service Type");
     }

     //Payment types validation
      const allowedPaymentTypes = ["COD", "PREPAID", "CREDIT"];

     if (!allowedPaymentTypes.includes(data.PaymentType)) {
        throw new Error("Invalid Payment Type");
     }

     // Pieces Validation
     if (!Array.isArray(data.Pieces) || data.Pieces.length === 0) {
        throw new Error("At least one piece is required");
       }

     // Total Pieces
     data.TotalPieces = data.Pieces.length;

     // Total Weight Calculate
     data.TotalWeight = data.Pieces.reduce(
        (total, piece) => total + Number(piece.Weight), 0 );
       
     const result = await bookingRepository.createBooking(data, userId);
      return result;

    }


 //GET ALL BOOKINGS===============================
  const getBookings = async()=>{
    return await bookingRepository.getBookings();
    }


 //GET BOOKING BY ID==============================
 const getBookingById = async(bookingId)=>{
    return await bookingRepository.getBookingById(bookingId);
 }


 //UPDATE BOOKING======================================
 const updateBooking = async(data, userId)=>{
    data.UpdatedBy = userId;

    // Booking ID Validation
if (!data.BookingId || isNaN(data.BookingId)) {
        throw new Error("Invalid Booking ID");
    }

    // Service Type Validation
     const allowedServiceTypes = [ "AIR", "SURFACE", "SEA", "EXPRESS"];

    if (!allowedServiceTypes.includes(data.ServiceType)) {
        throw new Error("Invalid Service Type");
    }

    // Payment Type Validation
     const allowedPaymentTypes = [ "COD","PREPAID","CREDIT" ];

    if (!allowedPaymentTypes.includes(data.PaymentType)) {
        throw new Error("Invalid Payment Type");
    }

// Pieces Validation
 if (!Array.isArray(data.Pieces) || data.Pieces.length === 0) {
        throw new Error("At least one piece is required");
    }

    // Calculate Summary
    data.TotalPieces = data.Pieces.length;

    data.TotalWeight = data.Pieces.reduce(
        (total, piece) => total + Number(piece.Weight),
        0
    );


     // Repository
     const result = await bookingRepository.updateBooking(data);

    return result;


  }


 //SOFT DELETE=======================================
 const deleteBooking = async (bookingId, userId) => {

    if (!bookingId || isNaN(bookingId)) {
        throw new Error("Invalid Booking ID");
    }

    const result = await bookingRepository.deleteBooking(
        Number(bookingId),
        userId
    );

    return result;
 };




 module.exports = {
    createBooking,
    getBookings,
    getBookingById,
    updateBooking,
    deleteBooking,

  }