/** @format */

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
	{
		currentStep: {
			type: Number,
			default: 0,
		},
		phoneNumber: {
			type: String,
			required: true,
		},
		email: String,
		firstName: String,
		lastName: String,
		isMasters: Boolean,
		interestedCourses: [
			{
				type: String,
			},
		],
		plannedYear: Number,
		plannedIntake: String,
		plannedCountries: [
			{
				type: String,
			},
		],
		currentStage: String,
		ugInfo: {
			college: String,
			course: String,
			score: String,
			graduationYear: Number,
			backlogs: Number,
		},
		englishTestInfo: {
			test: String,
			totalScore: Number,
			reading: Number,
			writing: Number,
			listening: Number,
			speaking: Number,
			testDate: { type: Date },
		},
	},
	{ timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
