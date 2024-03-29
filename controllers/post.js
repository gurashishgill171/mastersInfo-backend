/** @format */

import Post from "../models/post.js";

/** @format */

export const createPost = async (req, res) => {
	const { postTitle, postDescription, user } = req.body;
	if (!postTitle || !postDescription) {
		return res.status(400).json({
			error: "Please provide a title and description for the post.",
		});
	}

	const newPost = await Post.create({
		postTitle,
		postDescription,
		user: user,
	});

	await newPost.save();
	return res.status(200).json({
		message: "Post created successfully.",
		newPost,
	});
};

export const getPosts = async (req, res) => {
	try {
		const posts = await Post.find().populate(
			"user",
			"email plannedYear plannedIntake currentStage _id"
		);
		return res.status(200).json(posts);
	} catch (error) {
		return res.status(500).json({
			error: error.message,
		});
	}
};
