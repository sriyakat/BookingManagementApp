const { sql, poolPromish } = require("../../config/db");

// CREATE HUB ====================
const createHub = async (data, userId) => {
    const pool = await poolPromish;
    const result = await pool.request()
        .input("Action", sql.VarChar(20), "CREATE")
        .input("HubCode", sql.VarChar(30), data.HubCode )
        .input("HubName", sql.VarChar(150), data.HubName )  
        .input("City", sql.VarChar(100), data.City )
        .input("State", sql.VarChar(100), data.State )
        .input("Pincode",  sql.VarChar(20), data.Pincode || null )
        .input("CreatedBy", sql.Int, userId || null )
        .execute("sp_Hub");
    return result.recordset;
};


//GET ALL HUBS ====================
const getAllHubs = async(req , res , next)=>{
    const pool = await poolPromish;
    const result = await pool.request()
    .input("Action", sql.VarChar(20), "GET")
    .execute("sp_Hub")

    return result.recordset;
}


//GET HUB BY ID ====================
const getHubById = async (id) => {
    const pool = await poolPromish;
    const result = await pool.request()
        .input("Action", sql.VarChar(20), "GETBYID")
        .input("HubId", sql.VarChar(30), id)
        .execute("sp_Hub");

    return result.recordset[0];
};


//UPDATE HUB ====================
const updateHub = async (data, hubId, userId) => {
    const pool = await poolPromish;
    const result = await pool.request()
        .input("Action", sql.VarChar(20), "UPDATE")
        .input("HubId", sql.VarChar(30), hubId)
        .input("HubCode", sql.VarChar(30), data.HubCode)
        .input("HubName", sql.VarChar(150), data.HubName)
        .input("City", sql.VarChar(100), data.City)
        .input("State", sql.VarChar(100), data.State)
        .input("Pincode", sql.VarChar(20), data.Pincode || null)
        .input("UpdatedBy", sql.Int, userId || null)
        .execute("sp_Hub");

    return result.recordset[0];
};


//DELETE HUB ========================
const deleteHub = async(hubId)=>{
    const pool = await poolPromish;
    const result = await pool.request()
    .input("Action", sql.VarChar(20), "DELETE")
    .input("HubId", sql.VarChar(30), hubId)
    .execute("sp_Hub");
return result.recordset[0] || null;
}



module.exports = {
    createHub,
    getAllHubs,
    getHubById,
    updateHub,
    deleteHub
};