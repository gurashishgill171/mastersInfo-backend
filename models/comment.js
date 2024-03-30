/** @format */

import mongoose from "mongoose";
const { Schema } = mongoose;

const CommentSchema = new mongoose.Schema(
	{
		comment: String,
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{ timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);
export default Comment;
