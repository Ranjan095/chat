const jwt = require("jsonwebtoken");
const Users = require("../model/userModel");

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(400).send({
        message: "Invalid token",
      });
    }
    const user = await Users.findById(decoded.id);
    if (!user) {
      return res.status(400).send({
        message: "user not found",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
