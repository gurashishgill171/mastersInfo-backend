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
		aptitudeTestInfo: {
			test: String,
			verbal: Number,
			quants: Number,
			awa: Number,
			ir: Number,
			testDate: { type: Date },
		},
		skills: [{ type: String }],
		workExperience: {
			hasExperience: { type: Boolean, default: true },
			experience: {
				position: { type: String },
				organisation: { type: String },
				nature: { type: String },
				currentJob: { type: Boolean, default: false },
				startDate: { type: Date },
				endDate: { type: Date },
				description: { type: String },
			},
		},
		project: {
			hasProject: { type: Boolean, default: true },
			projectDetails: {
				title: { type: String },
				duration: { type: Number },
				url: { type: String },
				size: { type: Number},
				description: { type: String },
			},
		},
	},
	{ timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
