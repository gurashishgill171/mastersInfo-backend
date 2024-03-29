/** @format */

import mongoose from "mongoose";
const { Schema } = mongoose;

const PostSchema = new mongoose.Schema(
	{
		postTitle: String,
		postDescription: String,
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{ timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);
export default Post;
