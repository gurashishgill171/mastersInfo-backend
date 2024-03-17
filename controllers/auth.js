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
		const { phoneNumber } = req.body;

		const exsistingUser = await User.findOne({ phoneNumber: phoneNumber });

		if (exsistingUser) {
			return res.status(400).json({
				message: "User already exsist with this Phone Number",
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
				message: "Incorrect OTP",
			});
		}

		user = await user.save();
		const token = jwt.sign({ id: user._id }, "passwordKey");
		res.status(200).json({ token, ...user._doc });
		OTP = "";
	} catch (error) {
		res.status(500).json({
			error: e.message,
		});
	}
};

export const login = async () => {};
