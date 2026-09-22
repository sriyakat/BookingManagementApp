const AppError = require("../../utils/App.Error");
const hubRepository = require("./hub.repository");

// CREATE HUB =========================
const createHub = async (data, userId) => {
    if(!data.HubCode || !data.HubName ){
        throw new AppError("Please enter require HubCode and HubName ")
    }
    const result = await hubRepository.createHub(data, userId);
    return result;
};


//GET ALL HUBS =====================
const getAllHubs = async()=>{
    const result = await hubRepository.getAllHubs();
    return result;
}


//GET HUB BY ID =====================
const getHubById = async (id) => {
    if (!id) {
        throw new AppError("Enter Valid Hub Id");
    }
    const result = await hubRepository.getHubById(id);
    return result;
};


//UPDATE HUB =============
const updateHub = async (body, hubId) => {
    if (!hubId) {
        throw new AppError("Enter Valid Hub Id");
    }
    if (!body || Object.keys(body).length === 0) {
        throw new AppError("Update data is required");
    }
    const result = await hubRepository.updateHub(body, hubId);
    return result;
};


//DELETE HUB ======================
const deleteHub = async(hubId)=>{
    if(!hubId){
        throw new AppError("Please Enter Hub id")
    }
    const result = await hubRepository.deleteHub(hubId);
    return result;
}

module.exports = {
    createHub,
    getAllHubs,
    getHubById,
    updateHub,
    deleteHub
};