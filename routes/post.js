/** @format */

import express from "express";
import {
	createPost,
	getPosts,
	updatePost,
	likePost,
} from "../controllers/post.js";

const router = express.Router();

router.post("/create", createPost);
router.post("/update", updatePost);
router.post("/:postId/like", likePost);
router.get("/get", getPosts);

export default router;
