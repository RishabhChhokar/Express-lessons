import Post from "../models/Post.js";
import Comment from "../models/Comment.js";

export const getPosts = async (req, res) => {
  const posts = await Post.findAll({ include: Comment });
  res.render("index", { posts });
};

export const createPost = async (req, res) => {
  const { imageUrl, description } = req.body;
  await Post.create({ imageUrl, description });
  res.redirect("/");
};

export const createComment = async (req, res) => {
  const { postId, text } = req.body;
  await Comment.create({ postId, text });
  res.redirect("/");
};
