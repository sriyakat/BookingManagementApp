// User ke role ko check karne wala middleware
const authorizeRoles = (...allowedRoles) => {

    return (req, res, next) => {
        // Check kar rahe hain ki authentication middleware, ne req.user set kiya hai ya nahi
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required"
            });
        }


        // User ka roleId JWT se aa raha hai
        const userRoleId = Number(req.user.roleId);


        // Allowed roles ko Number mein convert karke, check kar rahe hain ki current user ka role allowed hai ya nahi 
        const isAllowed = allowedRoles.includes(userRoleId);


        // Agar role allowed nahi hai
        if (!isAllowed) {

            return res.status(403).json({
                success: false,
                message: "You do not have permission to perform this action"
            });
        }


        // Role allowed hai
        next();
    };
};


module.exports = authorizeRoles;