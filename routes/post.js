/** @format */

import express from "express";
import { createPost, getPosts } from "../controllers/post.js";

const router = express.Router();

router.post("/create", createPost);
router.get("/get", getPosts);

export default router;
