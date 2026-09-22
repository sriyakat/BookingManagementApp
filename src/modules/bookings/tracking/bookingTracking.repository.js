const { sql, poolPromish } = require("../../../config/db");


//CREATE TRACKING==========================
const createTracking = async (data)=>{
    const pool = await poolPromish;

    const result = await pool.request()
    .input("Action", sql.VarChar(50), "INSERT")
    .input("BookingId", sql.Int, data.BookingId)
    .input("Status", sql.VarChar(50), data.status)
    .input("Location", sql.VarChar(150), data.Location)
    .input("Remark", sql.VarChar(500), data.Remark)
    .input("UpdatedBy", sql.Int, data.UpdatedBy)

    .execute("sp_BookingTracking");

    return result.recordset;
};



// GET TRACKING BY BOOKING ID =========================
const getTrackingByBookingId = async(bookingId)=>{
    const pool = await poolPromish;

    const result = await pool.request()
    .input("Action" , sql.VarChar(50), "GETBYBOOKINGID")
    .input("BookingId", sql.Int, bookingId)
    .execute("sp_BookingTracking")

    return result.recordset;
}

//GET TRACKING BY AWB ======================
const getTrackingByAWB = async(AwbNo)=>{
    const pool = await poolPromish();

    const result = await pool.request()
   .input("Action", sql.VarChar(20), "GETBYAWB")
    .input("AWBNo", sql.VarChar(30), AwbNo)
    .execute("sp_BookingTracking");

     return {
        booking: result.recordsets[0][0],
        tracking: result.recordsets[1]
    };
}

//GET ALL TRACKING===========================
const getTracking = async ()=>{
    const pool = await poolPromish;

    const result = await pool.request()
    .input("Action", sql.VarChar(20), "GET")

        .execute("sp_BookingTracking");

        return result.recordset;
};


//GET TRACKING BY ID==========================
const getTrackingById = async(trackingId)=>{
    const pool = await poolPromish;

    const result = await pool.request()
    .input("Action", sql.VarChar(20), "GETBYID")
    .input("TrackingId", sql.Int, trackingId)

    .execute("sp_BookingTracking");

    return result.recordset;
};


//DELETE TRACKING==============================
const deleteTracking = async (trackingId) => {

    const pool = await poolPromish;

    const result = await pool.request()

        .input("Action", sql.VarChar(20), "DELETE")
        .input("TrackingId", sql.Int, trackingId)

        .execute("sp_BookingTracking");

    return result.recordset;
};


// GET BOOKING BY ID ,Current booking status check karne ke liye
const getBookingById = async (bookingId) => {

    const pool = await poolPromish;

    const result = await pool.request()

        .input("BookingId", sql.Int, bookingId)
        .execute(sp_BookingTracking)
      
    return result.recordset[0];
};


module.exports = {
    createTracking,
    getTracking,
    getTrackingById,
    deleteTracking,
    getBookingById,
    getTrackingByBookingId,
    getTrackingByAWB
}