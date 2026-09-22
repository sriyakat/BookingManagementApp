// jsonwebtoken package ko import kar rahe hain
const jwt= require("jsonwebtoken");

//JWT token generate 
const generateToken = (user)=>{

     // Token ke andar sirf required information rakhenge
     const payload = {
        userId: user.userId || user.UserId,
        roleId: user.roleId || user.RoleId,
        email: user.email || user.Email
     };

       // Payload ko secret key ke saath sign karke JWT generate kar rahe hain
       const token = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || "8h"
        }
       );
       return token;
};


module.exports = {
    generateToken,
}