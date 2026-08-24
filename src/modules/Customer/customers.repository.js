const {poolPromish, sql} = require("../../config/db");

const createCustomer =async (customerData)=>{
   
const pool = await poolPromish;

const result = await pool.request()
 .input("inputName", sql.VarChar(50), "addCustomer")
        .input("CustomerCode", sql.VarChar(50), customerData.CustomerCode)
        .input("CustomerName", sql.VarChar(150), customerData.CustomerName)
        .input("Email", sql.VarChar(150), customerData.Email || null)
        .input("MobileNo", sql.VarChar(20), customerData.MobileNo)
        .input("Address", sql.VarChar(500), customerData.Address || null)
        .input("City", sql.VarChar(100), customerData.City || null)
        .input("State", sql.VarChar(100), customerData.State || null)
        .input("Pincode", sql.VarChar(10), customerData.Pincode || null)
        .execute("sp_Customer");

        return result.recordset[0];  
}


const getCustomer =async()=>{
    const pool = await poolPromish;

    const result = await pool.request()
    .input("inputName", sql.VarChar(50), "getCustomer")

    .execute("sp_customer");

    return result.recordset;
}


const getCustomerById =async(customerId)=>{
    const pool = await poolPromish;

    const result = await pool.request()
        .input("inputName", sql.VarChar(50), "getCustomerById")
        .input("CustomerId", sql.Int, customerId)
        .execute("sp_Customer");

    return result.recordset[0] || null;
};



const updateCustomer = async(customerId, customerData)=>{
const pool = await poolPromish;

const result = await pool.request()
.input("inputName", sql.VarChar(50), "updateCustomer")
        .input("CustomerId", sql.Int, customerId)
        .input("CustomerCode", sql.VarChar(50), customerData.CustomerCode)
        .input("CustomerName", sql.VarChar(150), customerData.CustomerName)
        .input("Email", sql.VarChar(150), customerData.Email || null)
        .input("MobileNo", sql.VarChar(20), customerData.MobileNo)
        .input("Address", sql.VarChar(500), customerData.Address || null)
        .input("City", sql.VarChar(100), customerData.City || null)
        .input("State", sql.VarChar(100), customerData.State || null)
        .input("Pincode", sql.VarChar(10), customerData.Pincode || null)
        .execute("sp_Customer");

        return result.recordset[0] || null;
}




module.exports ={
    createCustomer,
    getCustomer,
    getCustomerById,
    updateCustomer,
}