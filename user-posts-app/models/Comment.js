import { Sequelize } from "sequelize";
import db from "../config/db.js";
import Post from './Post.js';

const Comment = db.define("comment", {
  text: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

Comment.belongsTo(Post);
Post.hasMany(Comment);

export default Comment;
