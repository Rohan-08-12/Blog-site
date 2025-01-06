const express = require("express");
const postRoutes = express.Router();
const upload=require("../config/multer");
const Post = require("../models/Post");
const { getPostForm, createPost, getPosts, getPostById, getEditPostForm, updatePost , deletePost } = require("../controllers/postControllers");
const { ensureAuthenticated } = require("../middleware/auth");


// get post form
postRoutes.get("/add", getPostForm);

// post logic
postRoutes.post(
    "/add",
    ensureAuthenticated,
    upload.array("images",5),
     createPost
);

// get all posts
postRoutes.get("/",getPosts);

//get post by id
postRoutes.get("/:id", getPostById);
postRoutes.get("/:id/edit", getEditPostForm);
postRoutes.delete("/:id", ensureAuthenticated, deletePost);
postRoutes.put(
  "/:id",
  ensureAuthenticated,
  upload.array("images", 5),
  updatePost
);

module.exports = postRoutes;