/** @format */

import Post from "../models/post.js";
import Comment from "../models/comment.js";

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

	await newPost.populate(
		"user",
		"email firstName lastName plannedYear plannedIntake currentStage _id"
	);
	await newPost.save();
	return res.status(200).json({
		message: "Post created successfully.",
		newPost,
	});
};

export const getPosts = async (req, res) => {
	try {
		const posts = await Post.find()
			.populate(
				"user",
				"email firstName lastName plannedYear plannedIntake currentStage _id"
			)
			.populate({
				path: "comments",
				populate: {
					path: "user",
					select:
						"email firstName lastName plannedYear plannedIntake currentStage _id",
				},
			});;
		return res.status(200).json(posts);
	} catch (error) {
		return res.status(500).json({
			error: error.message,
		});
	}
};

export const updatePost = async (req, res) => {
	const { postId, comment, userId } = req.body;

	const post = await Post.findOne({ _id: postId });

	if (!post) {
		return res.status(500).json({
			error: "No post with this ID",
		});
	}
	const newComment = await Comment.create({
		comment,
		user: userId,
	});

	await newComment.save();

	post.comments.push(newComment._id);
	await post.save();

	await post.populate({
		path: "user",
		select:
			"email firstName lastName plannedYear plannedIntake currentStage _id",
	});

	await post.save();

	await post.populate({
		path: "comments",
		populate: {
			path: "user",
			select:
				"email firstName lastName plannedYear plannedIntake currentStage _id",
		},
	});

	await post.save();

	return res.status(200).json({
		message: "Post saved successfully",
		post,
	});
};
