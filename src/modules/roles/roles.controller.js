const rolesService = require("./roles.service");

// getRoles
const getRoles = async (req, res) => {
    try {
        const roles = await rolesService.getRoles();
        return res.status(200).json({
            success: true,
            data: roles
        });
    } catch (error) {
        console.error("Get roles error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch roles"
        });
    }
};

// getRolesById
const getRolesById = async (req, res) => {
    try {
        const { id } = req.params;
        const role = await rolesService.getRolesById(id);

        if (!role) {
            // FIX: Comma replaced with Dot
            return res.status(404).json({
                success: false,
                message: "Role not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: role
        });
    } catch (err) {
        console.error("Get role by ID error:", err);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch role"
        });
    }
};

// createRoles====================================
const createRoles = async (req, res) => {
    try {
        const { roleName } = req.body;

        if (!roleName) {
            return res.status(400).json({
                success: false,
                message: "role name is required"
            });
        }

        const role = await rolesService.createRoles(roleName);

        return res.status(201).json({
            success: true,
            data: role
        });
    } catch (err) {
        console.error("Create role error:", err.message);

        // Agar SQL se "Role already exists" error aaye (Error code 50001)
        if (err.number === 50001 || err.message.includes("Role already exists")) {
            return res.status(400).json({
                success: false,
                message: "Role already exists"
            });
        }

        return res.status(500).json({
            success: false,
            message: "Failed to create role"
        });
    }
};

//updateRoles=====================================
const updateRoles = async (req, res) => {
    try {
        const { id } = req.params;
        const { roleName, isActive } = req.body;   // 👈 isActive bhi nikalo

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "id Not Found"
            });
        }

        if (!roleName) {
            return res.status(400).json({
                success: false,
                message: "roleName is required"
            });
        }

        const role = await rolesService.updateRoles(id, roleName, isActive);   // 👈 teeno pass karo

        if (!role) {
            return res.status(404).json({
                success: false,
                message: "role not Found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "role is updated",
            data: role
        });

    } catch (error) {
        console.error("Update role error", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update role"
        });
    }
};


//deleteRoles=====================================
const deleteRoles = async (req, res) => {
  try {
    const { id } = req.params; 

    // Check if ID is missing or invalid before database call
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Role ID is required"
      });
    }

    const deleteResult = await rolesService.deleteRoles(id);

    if (!deleteResult) {
      return res.status(404).json({
        success: false,
        message: "Role not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: deleteResult
    });

  } catch (error) {
    console.error("Delete role error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete role"
    });
  }
};


module.exports = {
    getRoles,
    getRolesById,
    createRoles,
    updateRoles,
    deleteRoles,
};