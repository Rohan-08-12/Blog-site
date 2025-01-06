const express = require("express");
const authRoutes=express.Router();
const {getLogin, getRegister, login, register , logout} = require("../controllers/authController");


// Render login page
authRoutes.get("/login",getLogin )

// Main logic for user login
authRoutes.post("/login",login )

// Render Register page
authRoutes.get("/register", getRegister)

// Main logic for user registration
authRoutes.post("/register", register)

// logout
authRoutes.get("/logout", logout);

module.exports=authRoutes;