const express = require("express");
const userRoutes=express.Router();
const {getUserProfile , deleteUserAccount , updateUserProfile , getEditProfileForm} = require("../controllers/userController");
const {ensureAuthenticated }= require("../middleware/auth");
const upload = require("../config/multer");


//Render login page
userRoutes.get("/profile", ensureAuthenticated, getUserProfile);

//Render edit profile page
userRoutes.get("/edit", ensureAuthenticated, getEditProfileForm);
userRoutes.post("/delete", ensureAuthenticated, deleteUserAccount);
userRoutes.post(
  "/edit",
  ensureAuthenticated,
  upload.single("profilePicture"),
  updateUserProfile
);

module.exports=userRoutes;