// Iska use JWT token ko verify karne ke liye hoga
const jwt = require("jsonwebtoken");

// Hamara custom application error import kar rahe hain
const AppError = require("../../src/utils/App.Error");


// JWT authentication middleware
const authenticate = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            throw new AppError("Authentication token is required", 401);
        }

        // Space ke basis par header ko do parts mein divide kar rahe hain
        const parts = authHeader.split(" ");

        // Check kar rahe hain ki format correct hai ya nahi
        if (parts.length !== 2 || parts[0] !== "Bearer" ) 
            {
            throw new AppError("Invalid authorization format", 401 );
            }

        // JWT token second part mein hai
        const token = parts[1];


        // Token ko secret key ke saath verify kar rahe hain
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );


        // Verified user information ko request object mein store kar rahe hain
        req.user = decoded;

        // Authentication successful hai,  Request ko next middleware/controller ke paas bhej rahe hain
        next();

    } catch (error) {
  // Agar JWT expired ho gaya hai
  if(error.name === "TokenExpiredError"){
    return next(
      new  AppError("Authentication Token Is Expire", 401)
    )
  };

// Agar JWT invalid hai
if(error.name === "JsonWebTokenError"){
    return next(
       new AppError("Invalid authentication token", 401)
    )
};

next(error);
    
    }
};


module.exports = authenticate;