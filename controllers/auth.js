/** @format */
import twilio from "twilio";
import dotenv from "dotenv";
import User from "../models/user.js";
import generateOTP from "../helpers/OTP.js";
import jwt from "jsonwebtoken";

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

let user, OTP;
export const register = async (req, res) => {
	try {
		let { phoneNumber } = req.body;

		const exsistingUser = await User.findOne({ phoneNumber: phoneNumber });

		if (exsistingUser) {
			return res.status(400).json({
				error: "User already exsist with this Phone Number",
			});
		}

		user = new User({
			phoneNumber,
		});

		OTP = generateOTP(5);

		await client.messages
			.create({
				body: `Your OTP verification code is ${OTP}`,
				messagingServiceSid: "MG932bbd7e7081a7cfed89df0d6d5b5ffd",
				to: phoneNumber,
			})
			.then((message) =>
				res.status(200).json({
					message: message,
				})
			);
	} catch (e) {
		res.status(500).json({
			error: e.message,
		});
	}
};

export const verifyOTP = async (req, res) => {
	try {
		const { otp } = req.body;
		if (otp != OTP) {
			return res.status(400).json({
				error: "Incorrect OTP",
			});
		}

		user = await user.save();
		const token = jwt.sign({ id: user._id }, "passwordKey");
		res.status(200).json({ token, ...user._doc });
		OTP = "";
	} catch (error) {
		res.status(500).json({
			error: error.message,
		});
	}
};

export const login = async (req, res) => {
	try {
		const { phoneNumber } = req.body;

		user = await User.findOne({ phoneNumber: phoneNumber });

		if (!user) {
			return res.status(400).json({
				error: "No User with this phone number.",
			});
		}

		OTP = generateOTP(5);

		await client.messages
			.create({
				body: `Your OTP verification code is ${OTP}`,
				messagingServiceSid: "MG932bbd7e7081a7cfed89df0d6d5b5ffd",
				to: phoneNumber,
			})
			.then((message) =>
				res.status(200).json({
					message: message,
				})
			);
	} catch (error) {
		return res.status(500).json({
			error: error.message,
		});
	}
};

export const saveProfile = async (req, res) => {
	try {
		const { phoneNumber } = req.body;

		if (!phoneNumber) {
			return res.status(400).json({ error: "Phone number is required" });
		}

		let user = await User.findOne({ phoneNumber });

		if (!user) {
			return res.status(500).json({ error: "No user with this Phone number" });
		}

		for (const key in req.body) {
			if (key !== "phoneNumber") {
				user[key] = req.body[key];
			}
		}

		await user.save();

		return res
			.status(200)
			.json({ message: "Profile saved successfully", user });
	} catch (error) {
		res.status(500).json({
			error: e.message,
		});
	}
};
