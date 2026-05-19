import mongoose, { Schema, model, models } from "mongoose";

const OrderItemSchema = new Schema({
  product:  { type: Schema.Types.ObjectId, ref: "Product" },
  quantity: { type: Number },
  price:    { type: Number },
});

const OrderSchema = new Schema({
  user:   { type: Schema.Types.ObjectId, ref: "User" },
  items:  [OrderItemSchema],
  total:  { type: Number },
  status: { type: String, default: "pending" },
}, { timestamps: true });

export const Order = models.Order || model("Order", OrderSchema);