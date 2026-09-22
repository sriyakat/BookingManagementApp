const customerService = require("./customers.service");
 const AppError = require("../../utils/App.Error");



const createCustomer = async(req , res)=>{
    try{
        // JWT middleware ne authenticated user ki information, req.user mein store ki hai
         const userId = req.user.userId;

        // Customer data + logged-in user ID service ko bhej rahe hain
        const customer = await customerService.createCustomer(
            req.body,
            userId
        );

return res.status(200).json({
    success: true,
    message: "Customer Created Successfully",
    data: customer
});

    }catch(error){
return res.status(400).json({
    success: false,
    message: error.message || "Failed to create customer"
});
    }
};


const getCustomer = async(req , res, next)=>{
try{
    const body = req.body;
const customers = await customerService.getCustomer(body);

return res.status(200).json({
    success: true,
    data: customers
});

}catch(error){
next(error)
}
};



const getCustomerById = async (req, res,next) => {
    try {

        const customerId = parseInt(req.params.id);

        const customer = await customerService.getCustomerById(customerId);

        if (!customer) {
           throw new AppError("Customer Not Found", 404)
        }
        return res.status(200).json({
            success: true,
            data: customer
        });

    } catch (error) {
        console.error("Get customer by ID error:", error);

         next(error)
    }
};



const updateCustomer = async (req, res) => {
    try {

        const customerId = parseInt(req.params.id);

        const customer = await customerService.updateCustomer(customerId, req.body);

        return res.status(200).json({
            success: true,
            message: "Customer updated successfully",
            data: customer
        });

    } catch (error) {
        console.error("Update customer error:", error);

        return res.status(500).json({
            success: false,
            message: error.message || "Failed to update customer"
        });
    }
};


const deleteCustomer = async(req, res)=>{
    try{
const customerId =parseInt(req.params.id);

const customer = await customerService.deleteCustomer(customerId);

return res.status(200).json({
    success: true,
    message: "Customer Delete Successfully",
    data: customer
});

    }catch(error){
return res.status(500).json({
    success:false,
    message: error.message || "Failed to Delete Customer"
});
    }
};

module.exports ={
    createCustomer,
    getCustomer,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
}