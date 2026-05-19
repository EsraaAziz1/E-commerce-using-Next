import mongoose, { Schema, model, models } from "mongoose";

const CartItemSchema = new Schema({
  product:  { type: Schema.Types.ObjectId, ref: "Product" },
  quantity: { type: Number, default: 1 },
});

const CartSchema = new Schema({
  user:  { type: Schema.Types.ObjectId, ref: "User", unique: true },
  items: [CartItemSchema],
}, { timestamps: true });

export const Cart = models.Cart || model("Cart", CartSchema);