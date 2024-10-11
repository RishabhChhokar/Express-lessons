import Comment from "../models/Comment.js";

export const createComment = async (req, res) => {
  try {
    const { postId, text } = req.body;

    if (!postId || !text) {
      return res
        .status(400)
        .json({ message: "Post ID and comment text are required" });
    }

    await Comment.create({ postId, text });

    res.redirect("/");
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ message: "Error creating comment" });
  }
};
