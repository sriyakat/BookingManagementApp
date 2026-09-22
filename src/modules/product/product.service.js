const productRepository = require('./product.repository');
const AppError = require('../../utils/App.Error');

//CREATE PRODUCT ======================================
const createProduct = async (productData) =>{
  if(!productData.ProductName || !productData.Price){ 
    throw new AppError("ProductName and Price are required fields", 400);   
}
if(productData.Price <= 0){
    throw new AppError("Price must be greater than zero", 400);
}
if(productData.Quantity <= 0){
    throw new AppError("Quantity must be a positive number", 400);
}

const product = await productRepository.createProduct(productData);
return product;
}

//GET ALL PRODUCTS =====================================
const getAllProducts = async (queryParams) => {
    if(queryParams.Price && queryParams.Price <= 0){
        throw new AppError("Price filter must be greater than zero", 400);
    }
    if(queryParams.Quantity && queryParams.Quantity <= 0){
        throw new AppError("Quantity filter must be a positive number", 400);
    }
    const products = await productRepository.getAllProducts(queryParams);
    return products;
}

//GET PRODUCT BY ID =====================================
const getProductById = async (productId) => {
    if(!productId || isNaN(productId) || productId <= 0){
        throw new AppError("Invalid Product ID", 400);
    }
    const product = await productRepository.getProductById(productId);
    if (!product) {
        throw new AppError("Product not found in Table", 404);
    }
    return product;
}


//UPDATE PRODUCT BY ID =====================================
const updateProductById = async (productId, productData) => {
    if(!productId || isNaN(productId) || productId <= 0){
        throw new AppError("Invalid Product ID", 400);
    }
    if(!productData){
        throw new AppError("Product data is required", 400);
    }
    const product = await productRepository.updateProductById(productId, productData);
    if (!product) {
        throw new AppError("Product not found in Database", 404);
    }
    return product;
};


//delete product by id =====================================
const deleteProductById = async(productId)=>{
    // if(!productId.ProductId){
    // throw new AppError("Please Enter Valid Product Id")
    // }

    const deleteProductById = await productRepository.deleteProductById(productId);
    return deleteProductById;
}

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    deleteProductById,
}



