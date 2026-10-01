const {sql, poolPromish} = require("../../config/db.js");

const createEmployee = async(body)=>{
    const pool = await poolPromish;
    const result = await pool.request()
      .input("Action", sql.VarChar(20), "CREATE")
      .input("EmployeeCode", sql.VarChar(30), body.EmployeeCode)
      .input("EmployeeName", sql.VarChar(150), body.EmployeeName)
      .input("MobileNo", sql.VarChar(20), body.MobileNo || null)
      .input("Email", sql.VarChar(150), body.Email || null)
      .input("Designation", sql.VarChar(100), body.Designation || null)
      .input("HubId", sql.Int, body.HubId ? parseInt(body.HubId, 10) : null)
      .input("IsActive", sql.Bit, body.IsActive !== undefined ? body.IsActive : true)
      .input("CreatedBy", sql.Int, body.CreatedBy ? parseInt(body.CreatedBy, 10) : null)
      .execute("sp_Employee");

    return result.recordset[0] || [];
}

// GET ALL EMPLOYEES ======================
const getAllEmployees = async () => {
    const pool = await poolPromish;
    const result = await pool.request()
        .input("Action", sql.VarChar(20), "GET")
        .execute("sp_Employee");

    return result.recordset;
};


// GET EMPLOYEE BY ID====================
const getEmployeeById = async (employeeId) => {
    const pool = await poolPromish;
    const result = await pool.request()
        .input("Action", sql.VarChar(20), "GETBYID")
        .input("EmployeeId",sql.Int,employeeId)
         .execute("sp_Employee");   
           return result.recordset;
};  


// UPDATE EMPLOYEE===========================
const updateEmployee = async (employeeId, data, userId) => {
    const pool = await poolPromish;
    const result = await pool.request()
        .input("Action", sql.VarChar(20), "UPDATE")
        .input( "EmployeeId",sql.Int,employeeId)
        .input("EmployeeCode",sql.VarChar(30), data.EmployeeCode )
        .input("EmployeeName",sql.VarChar(150),data.EmployeeName) 
        .input("MobileNo",sql.VarChar(20),data.MobileNo)
        .input("Email",sql.VarChar(150),data.Email || null)
        .input("Designation",sql.VarChar(100),data.Designation)       
       .input("HubId",sql.Int,data.HubId)
        .input("UpdatedBy",sql.Int,userId)
        .execute("sp_Employee");

    return result.recordset;
};



// DELETE EMPLOYEE =============================
const deleteEmployee = async (employeeId, userId) => {
    const pool = await poolPromish;
    const result = await pool.request()
        .input("Action", sql.VarChar(20), "DELETE")
        .input("EmployeeId",sql.Int,employeeId)
        .input("UpdatedBy",sql.Int, userId)
        .execute("sp_Employee");

    return result.recordset;
};



module.exports = {
    createEmployee,
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
}