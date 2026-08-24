const customerRepository = require("./customers.repository");

const createCustomer = async(customerData)=>{

    return await customerRepository.createCustomer(customerData);
}

const getCustomer = async()=>{
    return await customerRepository.getCustomer();
};


const getCustomerById = async (customerId) => {

       return await customerRepository.getCustomerById(customerId);

};

const updateCustomer = async(customerId , customerData)=>{
    return customerRepository.updateCustomer(customerId , customerData);

};



module.exports = {
    createCustomer,
    getCustomer,
    getCustomerById,
    updateCustomer,

}