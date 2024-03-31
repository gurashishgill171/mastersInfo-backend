/** @format */

import express from "express";
import { createPost, getPosts, updatePost } from "../controllers/post.js";

const router = express.Router();

router.post("/create", createPost);
router.post("/update", updatePost);
router.get("/get", getPosts);

export default router;
