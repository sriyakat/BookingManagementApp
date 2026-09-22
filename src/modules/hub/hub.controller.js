const hubService = require("./hub.service");

// CREATE HUB =================
const createHub = async (req, res, next) => {
    try {
        const data = req.body;
        const userId = req.user.UserId;

        const result = await hubService.createHub(data, userId);
        return res.status(201).json({
            success: true,
            message: "Hub created successfully",
            data: result
        });
    } catch (error) {
        next(error);
    }
};


//GET ALL HUBS ========================
const getAllHubs = async(req, res, next)=>{
  try{
      const hubId = req.body;
    const result = await hubService.getAllHubs(hubId)

    return res.status(200).json({
        status:true,
        message:"All hubs details Fetch successfully",
        data:result
    });
  }catch(err){
    next(err)
  }
}



//GET HUB BY HUB ID ==================
const getByHubId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await hubService.getHubById(id);
        return res.status(200).json({
            status: true,
            message: `Hub fetched successfully`,
            data: result
        });
    } catch (err) {
        next(err);
    }
};


//UPDATE BY ID ======================
const updateHub = async(req, res, next)=>{
    try{
        const body = req.body;
        const hubId = req.params.id;

        const result = await hubService.updateHub(body, hubId);
        return res.status(200).json({
            success:true,
            message:"Hub update successfully",
            data:result
        });
    }catch(err){
        next(err)
    }
}


//DELETE HUB ====================
const deleteHub = async(req, res, next)=>{
    try{
        const hubId = req.params.id;
        const result = await hubService.deleteHub(hubId);
        return res.status(200).json({
            success:true,
            message:"Hub delete successfully",
            data:result
        });
    }catch(err){
        next(err)
    }
}


module.exports = {
    createHub,
    getAllHubs,
    getByHubId,
    updateHub,
    deleteHub,
};