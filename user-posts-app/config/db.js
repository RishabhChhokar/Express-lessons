import { Sequelize } from "sequelize";

const db = new Sequelize(
  "user_post_db",
  "root",
  "#######",
  {
    host: "localhost",
    dialect: "mysql",
  }
);

export default db;
