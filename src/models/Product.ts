import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
  name:        { type: String, required: true },
  description: { type: String, required: true },
  price:       { type: Number, required: true },
  images:       { type: [String], default: [] },
  stock:       { type: Number, default: 0 },
  category:    { type: Schema.Types.ObjectId, ref: "Category" },
  featured:    { type: Boolean, default: false },
}, { timestamps: true });

export const Product = models.Product || model("Product", ProductSchema);