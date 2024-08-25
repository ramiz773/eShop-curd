import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.routes.js";
dotenv.config();

const app = express();

//  middlewares
app.use(express.json());

app.use("/api/products", productRoutes);

// // get all product
// app.get("/api/products");

// // create productt
// app.post("/api/products");

// //  delete product
// app.delete("/api/products/:id");

// // update document
// app.put("/api/products/:id");

app.listen(5000, () => {
   connectDB();
   console.log(`Server running on port number ${5000}`);
});
