const { sql, poolPromish } = require("../../config/db");

const registerUser = async (userData) => {
  
  // Fallback check (CamelCase ya PascalCase dono support karega)
  const userName = userData.UserName || userData.userName;
  const email = userData.Email || userData.email;
  const passwordHash = userData.PasswordHash || userData.passwordHash;
  const roleId = userData.RoleId || userData.roleId;
  const mobileNo = userData.MobileNo || userData.mobileNo;

  const pool = await poolPromish;
  const result = await pool
    .request()
    .input("inputName", sql.VarChar, "register")
    .input("UserName", sql.VarChar, userName)
    .input("Email", sql.VarChar, email)
    .input("PasswordHash", sql.VarChar, passwordHash)
    .input("RoleId", sql.Int, Number(roleId)) // Explicitly parsed to integer
    .input("MobileNo", sql.VarChar, mobileNo)
    .execute("sp_Auth");

  return result.recordset[0];
};


// Email ke basis par user ko database se fetch karta hai
const loginUser = async(email)=>{
  const pool = await poolPromish;
  const result = await pool.request()
  .input("inputName", sql.VarChar(50), "login")    // SP ko batate hain ki hume login operation perform karna hai
  .input("Email", sql.VarChar(250), email)         // Login ke liye user ka email pass kar rahe hain
  .execute("sp_Auth")

  return result.recordset[0] || null ;     // User mila to first record return hoga or nahi mila to null return hoga
                                                  
}


module.exports = {
  registerUser,
  loginUser,
};