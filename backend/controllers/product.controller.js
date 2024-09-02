import Product from "../models/product.model.js";
import mongoose from "mongoose";

const getProducts = async (req, res) => {
   try {
      const products = await Product.find({});
      res.status(200).json({ success: true, data: products });
   } catch (error) {
      console.log("Error in fetching products :", error.message);
      res.status(500).json({ success: false, error: "Internal server error" });
   }
};

const createProduct = async (req, res) => {
   const product = req.body;
   if (!product.name || !product.price || !product.image) {
      return res.status(400).json({
         success: false,
         message: "Please provide all fields",
      });
   }

   const newProduct = new Product(product);

   try {
      await newProduct.save();
      res.status(201).json({ success: true, data: newProduct });
   } catch (error) {
      console.error("Error in create product document:", error.message);
      res.status(500).json({
         success: false,
         message: "Internal Server Error",
      });
   }
};

const updateProduct = async (req, res) => {
   const { id } = req.params;
   const product = req.body;
   console.log(id, product);
   if (!mongoose.isValidObjectId) {
      return res.status(404).json({ success: false, error: "Invalid product id" });
   }
   try {
      const updatedProduct = await Product.findByIdAndUpdate(id, product, {
         new: true,
      });
      res.status(200).json({ success: true, data: updatedProduct });
   } catch (error) {
      console.log("error in updating product", error.message);
      res.status(500).json({
         success: false,
         error: "Invalid Server error",
      });
   }
};

const deleteProduct = async (req, res) => {
   const { id } = req.params;

   if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ success: false, message: "Invalid product id" });
   }

   try {
      await Product.findByIdAndDelete(id);
      res.status(200).json({ success: true, message: "Product deleted" });
   } catch (error) {
      console.log("Error in deleting products :", error.message);
      res.status(500).json({
         success: false,
         message: "Internal server error",
      });
   }
};

export { getProducts, createProduct, deleteProduct, updateProduct };
