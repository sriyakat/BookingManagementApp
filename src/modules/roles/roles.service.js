const rolesRepository = require("./roles.repository")
//getRoles==========================================
const getRoles = async()=>{
    return await rolesRepository.getRoles();
};


//getRolesById======================================
const getRolesById = async(id)=>{
    return await rolesRepository.getRolesById(id);
}

//createRoles==========================================
const createRoles = async(roleName)=>{
    return await rolesRepository.createRoles(roleName);
}

//updateRoles=============================================
const updateRoles = async (id, roleName, isActive) => {
    return await rolesRepository.updateRoles(id, roleName, isActive);
};


//deleteRoles==============================================
const deleteRoles = async (id) => {
  // Check if ID exists before calling repository
  if (!id) {
    ;throw new Error("Role ID is required");
  }
  return await rolesRepository.deleteRoles(id);
  
};


module.exports = {
    getRoles,
    getRolesById,
    createRoles,
    updateRoles,
    deleteRoles,
}