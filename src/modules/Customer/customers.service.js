const customerRepository = require("./customers.repository");


const createCustomer = async (customerData, userId) => {

    // Repository ko customer data aur logged-in user ID bhej rahe hain
    return await customerRepository.createCustomer( customerData, userId );
};


const getCustomer = async()=>{
    return await customerRepository.getCustomer();
};


const getCustomerById = async (customerId) => {

       return await customerRepository.getCustomerById(customerId);

};

const updateCustomer = async(customerId , customerData)=>{
    return customerRepository.updateCustomer(customerId , customerData);

};


const deleteCustomer = async(customerId)=>{
    return await customerRepository.deleteCustomer(customerId);
}

module.exports = {
    createCustomer,
    getCustomer,
    getCustomerById,
    updateCustomer,
    deleteCustomer,

}