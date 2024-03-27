/** @format */

import express from "express";
import {
	login,
	register,
	saveProfile,
	verifyOTP,
} from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/verifyOTP", verifyOTP);
router.post("/save", saveProfile);

export default router;
