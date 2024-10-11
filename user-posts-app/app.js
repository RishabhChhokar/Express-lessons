import express from "express";
import postRoutes from "./routes/postRoutes.js";
import db from "./config/db.js";

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


app.set("view engine", "ejs");


db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));

db.sync({ force: false })
  .then(() => console.log('Database & tables created!'))
  .catch(err => console.log('Error syncing database: ' + err));


app.use("/", postRoutes);


app.listen(3000, () => console.log(`Server running on port ${3000}`));
