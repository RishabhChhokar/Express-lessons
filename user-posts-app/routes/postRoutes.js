import express from "express";
import {
  getPosts,
  createPost,
  createComment,
} from "../controllers/postController.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/create-post", createPost);
router.post("/create-comment", createComment);

export default router;
