const express = require("express");
const commentRoutes = express.Router();
const {ensureAuthenticated} = require("../middleware/auth");
const { addComment,getCommentForm , updateComment ,deleteComment} = require("../controllers/commentControllers");

// add comment
commentRoutes.post("/posts/:id/comments",ensureAuthenticated, addComment); 
// get comment form
commentRoutes.get("/comments/:id/edit", ensureAuthenticated, getCommentForm);
// update comment
commentRoutes.put("/comments/:id",ensureAuthenticated, updateComment);
// delete comment
commentRoutes.delete("/comments/:id",ensureAuthenticated, deleteComment);
module.exports = commentRoutes;