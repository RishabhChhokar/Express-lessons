import express, { json } from "express";
import productRoutes from "./routes/productRoutes.js"
import { join } from "path";
import path from "path";
const app = express();
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(json());
app.use(express.static(join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use("/api", productRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
