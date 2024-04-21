/** @format */

import Post from "../models/post.js";
import Comment from "../models/comment.js";
import cloudinary from "../utils/cloudinary.js";

/** @format */

export const createPost = async (req, res) => {
	const { postDescription, user, image } = req.body;
	if (!postDescription) {
		return res.status(400).json({
			error: "Please provide a description for the post.",
		});
	}

	let newPost;
	if (image !== null) {
		const imageUploadResult = await cloudinary.v2.uploader.upload(image, {
			folder: "posts",
		});
		newPost = await Post.create({
			postDescription,
			user: user,
			postImage: {
				publicID: imageUploadResult.public_id,
				url: imageUploadResult.secure_url,
			},
		});
	} else {
		newPost = await Post.create({
			postDescription,
			user: user,
			postImage: {
				publicID: null,
				url: null,
			},
		});
	}

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
			});
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

export const likePost = async (req, res) => {
	const { postId } = req.params;
	const { userId } = req.body;

	try {
		const post = await Post.findById(postId);

		if (!post) {
			return res.status(500).json({
				error: "No post with this ID",
			});
		}

		const userIndex = post.likedBy.indexOf(userId);

		if (userIndex === -1) {
			post.likes += 1;
			post.likedBy.push(userId);
		} else {
			post.likes -= 1;
			post.likedBy.splice(userIndex, 1);
		}

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

		res.status(200).json({ message: "Post updated successfully", post });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
