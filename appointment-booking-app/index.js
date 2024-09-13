import express, { json } from "express";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import { join } from "path";
import path from "path";
const app = express();
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(json());
app.use(express.static(join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use("/api", appointmentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
