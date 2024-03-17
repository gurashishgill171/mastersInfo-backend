/** @format */

export default function generateOTP(length) {
	var digits = "0123456789";
	var OTP = "";
	for (let i = 0; i < length; i++) {
		OTP += digits[Math.floor(Math.random() * 10)];
	}
	return OTP;
}
