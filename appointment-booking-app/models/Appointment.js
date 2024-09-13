import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Appointment = sequelize.define("Appointment", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  time: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

sequelize.sync()
  .then(() => console.log("Appointment table created"))
  .catch((err) => console.log("Error creating table: ", err));

export default Appointment;
