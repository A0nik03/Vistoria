const JWT = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config(); 
const createToken = (user) => {
  const token = JWT.sign(
    {
      id: user._id,
      email: user.email,
      username: user.userName,
      profileImageURL: user.profileImageURL,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
  return token;
};

const validateToken = (token) => {
  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
};

module.exports = { createToken, validateToken };
