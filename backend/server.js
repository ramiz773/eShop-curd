import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import path from "path";
import productRoutes from "./routes/product.routes.js";
dotenv.config();

const app = express();
console.log(process.env.PORT);
const port = process.env.PORT || 6000;
const __dirname = path.resolve();

//  middlewares
app.use(express.json());
app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
   app.use(express.static(path.join(__dirname, "/frontend/dist")));

   app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
   });
}

app.listen(port, () => {
   connectDB();
   console.log(`Server running on port number ${port}`);
});
