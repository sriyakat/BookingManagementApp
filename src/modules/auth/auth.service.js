const bcrypt = require("bcrypt");
const authRepository = require("./auth.repository");
const AppError = require("../../utils/App.Error");
const {generateToken } = require("../../utils/jwt");


const registerUser = async (userData)=>{

// // Security Check: Block public users from assigning Admin RoleId (1)
//     if (Number(requestedRoleId) === 1) {
//         throw new AppError("Access Denied: You cannot register as an Admin", 403);
//     }


// Password Extraction with Fallback
    const password = userData.Password || userData.password;
    if (!password) {
        throw new AppError("Password is required for registration", 400);
    }

//passwordHash
    const passwordHash = await bcrypt.hash(userData.Password, 10);

    const user = await authRepository.registerUser({
        UserName: userData.UserName || userData.userName,
        Email: (userData.Email || userData.email || '').trim().toLowerCase(),
        PasswordHash: passwordHash,
        MobileNo: userData.MobileNo || userData.mobileNo,
        RoleId: userData.RoleId || userData.roleId
    });
    return user;
}


// User ke email aur password ko authenticate karta hai
const loginUser = async(email, password)=>{

// Database se email ke basis par user fetch kar rahe hain
    const user = await authRepository.loginUser(email);

    if(!user){
        throw new AppError("Invalid Email or Password", 401);
    };

     // Check kar rahe hain ki user active hai ya nahi
    if (!user.IsActive) {
        throw new AppError("User account is inactive", 401);
    };

     // User ke entered password ko database ke hashed password ke saath compare kar rahe hain
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash || user.PasswordHash);

    if(!isPasswordValid){
        throw new AppError("Invalid Email or Password", 401);
    };

// Password correct hai, ab user ke liye JWT token generate karenge
const token = generateToken(user); 


    // Password correct hone par user data return karenge
    return{
      
        UserId: user.UserId || user.userId,
        UserName: user.UserName || user.userName,
        Email: user.Email || user.email,
        MobileNo: user.MobileNo || user.mobileNo,
        RoleId: user.RoleId || user.roleId,
    
       token: token
};

};



module.exports = {
    registerUser,
    loginUser,
}