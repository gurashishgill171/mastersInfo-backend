/** @format */

import express from "express";
import { login, register, verifyOTP } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/verifyOTP", verifyOTP);

export default router;
