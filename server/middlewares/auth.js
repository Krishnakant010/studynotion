const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

// auth
exports.auth = async (req, res, next) => {
  try {
    // extract token
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization").replace("Bearer ", "");
    //   if tyoken is not present
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token not found",
      });
    }
    // verify token
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decode);
      req.user = decode;
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Toekn is invalid",
      });
    }
    mext();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong while verifying token",
    });
  }
};
// isStudent
exports.isStudent = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Student") {
      return res.status(401).json({
        success: false,
        message: "This is protected route for students",
      });
    }
  } catch (e) {
    return res
      .status(500)
      .json({ success: false, message: "User role cannot be verified" });
  }
};
// isInstructor
exports.isInstructor = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Instructor") {
      return res.status(401).json({
        success: false,
        message: "This is protected route for Instructor",
      });
    }
  } catch (e) {
    return res
      .status(500)
      .json({ success: false, message: "User role cannot be verified" });
  }
};
// isAdmin
exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "This is protected route for Admin",
      });
    }
  } catch (e) {
    return res
      .status(500)
      .json({ success: false, message: "User role cannot be verified" });
  }
};