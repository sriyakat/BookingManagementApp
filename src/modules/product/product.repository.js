const {sql, poolPromish} = require("../../config/db");

const createProduct = async(productData)=>{
    const pool = await poolPromish;
    const product = await pool.request()
    .input("Action", sql.VarChar(50), 'CREATE')
    .input("ProductId", sql.Int, 0)
    .input('ProductName', sql.VarChar(255), productData.ProductName)
    .input('Price', sql.Decimal(10, 2), productData.Price)
    .input("Quantity", sql.Int, productData.Quantity)
    .execute("sp_Product");

    return product.recordset[0];    
}

//GET ALL PRODUCTS =====================================
const getAllProducts = async(queryParams)=>{
    const pool = await poolPromish;
    const products = await pool.request()
    .input("Action", sql.VarChar(50), 'GET_ALL')
    .input("ProductId", sql.Int, 0)
    .input('ProductName', sql.VarChar(255), queryParams.ProductName || null)
    .input('Price', sql.Decimal(10, 2), queryParams.Price || null)
    .input("Quantity", sql.Int, queryParams.Quantity || null)
    .execute("sp_Product");
    return products.recordset;
}

//GET PRODUCT BY ID =====================================
const getProductById = async(productId)=>{
    const pool = await poolPromish;
    const product = await pool.request()    
        .input("Action", sql.VarChar(50), 'GET_BY_ID')
        .input("ProductId", sql.Int, productId)
        .input("ProductName", sql.VarChar(150), null)
        .input("Price", sql.Decimal(10, 2), null)
        .input("Quantity", sql.Int, null)
        .execute("sp_Product");

    return product.recordset[0] || null;
}


//UPDATE PRODUCT BY ID =====================================
const updateProductById = async(productId, productData)=>{
    const pool = await poolPromish;
    const product = await pool.request()
        .input("Action", sql.VarChar(50), 'UPDATE')
        .input("ProductId", sql.Int, productId)
        .input('ProductName', sql.VarChar(255), productData.ProductName)
        .input('Price', sql.Decimal(10, 2), productData.Price)
        .input("Quantity", sql.Int, productData.Quantity)
        .execute("sp_Product");

    return product.recordset[0] || null;
};

//delete product by id =====================================
const deleteProductById = async(productId)=>{
    const pool = await poolPromish;

    const deleteProductById = await pool.request()
        .input("Action", sql.VarChar(50), 'DELETE')
        .input("ProductId", sql.Int, productId)
        .input('ProductName', sql.VarChar(255), productId.ProductName)
        .input('Price', sql.Decimal(10, 2), productId.Price)
        .input("Quantity", sql.Int, productId.Quantity)
        .execute("sp_Product");

        return deleteProductById.recordset[0] || []

}


module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    deleteProductById
}
