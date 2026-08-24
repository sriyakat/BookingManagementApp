const customerService = require("./customers.service");

const createCustomer = async(req , res)=>{
    try{
        const body = req.body;
const customer = await customerService.createCustomer(body);

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


const getCustomer = async(req , res)=>{
try{
    const body = req.body;
const customers = await customerService.getCustomer(body);

return res.status(200).json({
    success: true,
    data: customers
});

}catch(error){
return res.status(400).json({
    success: false,
    message: error.message || "Failed to fetch Customers"
});
}
};

const getCustomerById = async (req, res) => {
    try {

        const customerId = parseInt(req.params.id);

        const customer =
            await customerService.getCustomerById(customerId);

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: customer
        });

    } catch (error) {

        console.error("Get customer by ID error:", error);

        return res.status(400).json({
            success: false,
            message: "Failed to fetch customer" || error.message
        });
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


module.exports ={
    createCustomer,
    getCustomer,
    getCustomerById,
    updateCustomer,
}