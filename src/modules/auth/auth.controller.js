const authService = require("./auth.service");

const register = async (req, res, next) => {
  try {
    const { UserName, Email, Password, RoleId } = req.body;

    //Basic validation check
    if (!UserName || !Email || !Password || !RoleId) {
      return res.status(400).json({
        success: false,
        message: "UserName, Email, Password, and RoleId are required",
      });
    }

    const user = await authService.registerUser(req.body);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    next(error); a
  }
};


// User login request ko handle karta hai
const login = async (req, res, next) => {
  try {
    // Both camelCase and PascalCase support
    const email = req.body.email || req.body.Email;
    const password = req.body.password || req.body.Password;

    // Email/Password presence check
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required"
      });
    }

    // Request body se Email aur Password lekar authentication service ko bhej rahe hain
    const user = await authService.loginUser(email, password);

    // Authentication successful hone par response
    return res.status(200).json({
      success: true,
      message: "Login Successfully",
      data: user 
    });
    
  } catch (error) {
    // Error ko central error middleware ke paas bhej rahe hain
    next(error);
  }
};


module.exports = {
  register,
  login,
};