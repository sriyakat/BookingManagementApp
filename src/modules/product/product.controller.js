const productService = require("./product.service");

//CREATE PRODUCT ======================================
const createProduct = async(req, res, next)=>{
    try{
        const productData = req.body;
        const product = await productService.createProduct(productData);
        
        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: product
        });

    }catch(err){
        next(err);
    }
}


//GET ALL PRODUCTS =====================================
const getAllProducts = async(req, res, next)=>{
    try{
        const products = req.query;
        const allProducts = await productService.getAllProducts(products);
        res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            data: allProducts
        });

    }catch(err){
        next(err);
    }
}


//GET PRODUCT BY ID =====================================
const getProductById = async(req, res, next)=>{
    try{
        const productId = req.params.id;
        const product = await productService.getProductById(productId);
        res.status(200).json({
            success: true,
            message: "Product fetched successfully",
            data: product
        }); 
    }catch(err){
        next(err);
    }        
}


//update product by id =====================================
const updateProductById = async(req, res, next)=>{
    try{
const productId = req.params.id;
const productData = req.body;

const updatedProduct = await productService.updateProductById(productId, productData);
res.status(200).json({
    success: true,
    message: "Product updated successfully",
    data: updatedProduct
});
    }catch(err){
        next(err);
    }
}


//delete product by id =====================================
const deleteProductById = async(req, res, next)=>{
try{
     const productId = req.params.id
     const deleteProductById = await productService.deleteProductById(productId);

     return res.status(200).json({
        success: true,
        message: "Product Deleted Successfully",
        data: deleteProductById
     });
}catch(err){
    next(err);
}
     
}
    


module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    deleteProductById,
}

