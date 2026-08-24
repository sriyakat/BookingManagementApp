const { VarChar } = require("mssql");
const { poolPromish, sql } = require("../../config/db");


const getRoles = async () => {
    const pool = await poolPromish;

    const result = await pool.request()
    .input("Action", sql.VarChar, "GET")
    
    .execute("sp_GetRoles");
    
    return result.recordset;
};


const getRolesById = async (id) => {
    const pool = await poolPromish;
    const result = await pool.request().execute("sp_GetRoles");
    return result.recordset.find(r => r.RoleId === Number(id));
};


const createRoles = async(roleName)=>{
    const pool = await poolPromish;

    const result = await pool.request()
        .input("RoleName", sql.VarChar, roleName)
        .execute("sp_CreateRole"); // SQL me procedure ka name check kar lein

    // FIX: Directly [0] access mat karein
    if (result.recordset && result.recordset.length > 0) {
        return result.recordset[0];
    }
    
    return { roleName, message: "Role created successfully" };
};


const updateRoles = async (id, roleName, isActive) => {
    const pool = await poolPromish;

    const result = await pool.request()
        .input("RoleId", sql.Int, id)
        .input("RoleName", sql.VarChar(100), roleName)
        .input("IsActive", sql.Bit, isActive)
        .input("Action", sql.VarChar, "UPDATE")
        .execute("sp_GetRoles");

    return result.recordset[0];
};


const deleteRoles = async(id)=>{
    const pool = await poolPromish;

    const result = await pool.request()
    .input("RoleId", sql.VarChar, id)
    .input("Action", sql.VarChar, "DELETE")
    .execute("sp_GetRoles");

    return result.recordset[0]
}


module.exports = {
    getRoles,
    getRolesById,
    createRoles,
    updateRoles,
    deleteRoles,
};