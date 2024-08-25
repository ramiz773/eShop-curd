import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.routes.js";
dotenv.config();

const app = express();
console.log(process.env.PORT);
const port = process.env.PORT || 6000;

//  middlewares
app.use(express.json());
app.use("/api/products", productRoutes);

app.listen(port, () => {
   connectDB();
   console.log(`Server running on port number ${port}`);
});
