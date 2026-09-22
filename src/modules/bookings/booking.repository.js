const { sql, poolPromish } = require("../../config/db");



// CREATE BOOKING===============================================
const createBooking = async(data, userId)=>{
     
    const pool = await poolPromish;

    const result = await pool.request()
    .input("InputName", sql.VarChar(50), "createBooking")
    .input("CustomerId", sql.Int, data.CustomerId)

       //Sender
       .input("SenderName", sql.VarChar(150), data.SenderName)
        .input("SenderMobile", sql.VarChar(20), data.SenderMobile)
        .input("SenderEmail", sql.VarChar(150), data.SenderEmail)
        .input("SenderAddress", sql.VarChar(500), data.SenderAddress)
        .input("SenderCountry", sql.VarChar(100), data.SenderCountry)
        .input("SenderState", sql.VarChar(100), data.SenderState)
        .input("SenderCity", sql.VarChar(100), data.SenderCity || " ")
        .input("SenderPincode", sql.VarChar(20), data.SenderPincode || " ")

         // Receiver
        .input("ReceiverName", sql.VarChar(150), data.ReceiverName)
        .input("ReceiverMobile", sql.VarChar(20), data.ReceiverMobile)
        .input("ReceiverEmail", sql.VarChar(150), data.ReceiverEmail)
        .input("ReceiverAddress", sql.VarChar(500), data.ReceiverAddress)
        .input("ReceiverCountry", sql.VarChar(100), data.ReceiverCountry)
        .input("ReceiverState", sql.VarChar(100), data.ReceiverState)
        .input("ReceiverCity", sql.VarChar(100), data.ReceiverCity)
        .input("ReceiverPincode", sql.VarChar(20), data.ReceiverPincode)

         // Service & Payment
        .input("ServiceType", sql.VarChar(20), data.ServiceType || " ")
        .input("PaymentType", sql.VarChar(20), data.PaymentType || " ")

        // Booking Summary
        .input("TotalPieces", sql.Int, data.TotalPieces)
        .input("TotalWeight", sql.Decimal(10, 2), data.TotalWeight)
        .input("ChargeableWeight", sql.Decimal(10, 2), data.ChargeableWeight)
        .input("TotalAmount", sql.Decimal(18, 2), data.TotalAmount)
        // User
        .input("CreatedBy", sql.Int, userId)
        // Multiple Pieces
        .input("PiecesJson",sql.NVarChar(sql.MAX), JSON.stringify(data.Pieces) )
        .execute("sp_Booking");

     return result.recordset;
    
}


// GET ALL BOOKINGS================================================
const getBookings = async()=>{
    const pool = await poolPromish;

    const result = await pool.request()
    .input("InputName", sql.VarChar, "getBookings")

    .execute("sp_Booking");

    return result.recordset;
}


//GET BOOKING BY ID=================================================
const getBookingById = async(bookingId)=>{
    const pool = await poolPromish;

    const result = await pool.request()
    .input("InputName", sql.VarChar(50), "getBookingById")
    .input("BookingId", sql.Int, bookingId)

    .execute("sp_Booking");

    return result.recordset;
}


//UPDATE BOOKING=================================================
const updateBooking = async(data)=>{
    const pool = await poolPromish;

    const result = await pool.request()
    .input("InputName", sql.VarChar(50), "updateBooking")

        .input("BookingId", sql.Int, data.BookingId)
        .input("CustomerId", sql.Int, data.CustomerId)

        // Multiple pieces ko JSON ke form mein SQL ko bhejna
        .input( "PiecesJson", sql.NVarChar(sql.MAX), JSON.stringify(data.Pieces) )
        // Sender
        .input("SenderName", sql.VarChar(150), data.SenderName)
        .input("SenderMobile", sql.VarChar(20), data.SenderMobile)
        .input("SenderEmail", sql.VarChar(150), data.SenderEmail)
        .input("SenderAddress", sql.VarChar(500), data.SenderAddress)
        .input("SenderCountry", sql.VarChar(100), data.SenderCountry)
        .input("SenderState", sql.VarChar(100), data.SenderState)
        .input("SenderCity", sql.VarChar(100), data.SenderCity)
        .input("SenderPincode", sql.VarChar(20), data.SenderPincode)

        // Receiver
        .input("ReceiverName", sql.VarChar(150), data.ReceiverName)
        .input("ReceiverMobile", sql.VarChar(20), data.ReceiverMobile)
        .input("ReceiverEmail", sql.VarChar(150), data.ReceiverEmail)
        .input("ReceiverAddress", sql.VarChar(500), data.ReceiverAddress)
        .input("ReceiverCountry", sql.VarChar(100), data.ReceiverCountry)
        .input("ReceiverState", sql.VarChar(100), data.ReceiverState)
        .input("ReceiverCity", sql.VarChar(100), data.ReceiverCity)
        .input("ReceiverPincode", sql.VarChar(20), data.ReceiverPincode)

        // Service & Payment
        .input("ServiceType", sql.VarChar(20), data.ServiceType)
        .input("PaymentType", sql.VarChar(20), data.PaymentType)

        // Summary
        .input("TotalPieces", sql.Int, data.TotalPieces)
        .input("TotalWeight", sql.Decimal(10, 2), data.TotalWeight)
        .input("ChargeableWeight", sql.Decimal(10, 2), data.ChargeableWeight)
        .input("TotalAmount", sql.Decimal(18, 2), data.TotalAmount)

        // User
        .input("UpdatedBy", sql.Int, data.UpdatedBy)

        .execute("sp_Booking");

    return result.recordset;
}


//DELETE BOOKING===================================================
const deleteBooking = async (bookingId) => {
    const pool = await poolPromish; // poolPromise variable name fixed

    const result = await pool.request()
        .input("InputName", sql.VarChar(50), "deleteBooking")
        .input("BookingId", sql.Int, bookingId)
        .execute("sp_Booking");

    return result.recordset[0];
}


module.exports = {
    createBooking,
    getBookings,
    getBookingById,
    updateBooking,
    deleteBooking,

}