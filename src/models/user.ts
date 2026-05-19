import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  name:      { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  password:  { type: String },
  image:     { type: String },
  provider:  { type: String, default: "credentials" },
}, { timestamps: true });

export const User = models.User || model("User", UserSchema);