import { Sequelize } from "sequelize";
import db from "../config/db.js";

const Post = db.define("post", {
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

export default Post;
