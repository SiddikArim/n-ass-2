import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import {
  TAddress,
  TFullName,
  TOrders,
  TUser,
  UserMethods,
  UserModel,
} from "./user/user.interface";
import config from "../config";

const addressSchema = new Schema<TAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});
const ordersSchema = new Schema<TOrders>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});
const fullNameSchema = new Schema<TFullName>({
  firstName: {
    type: String,
    required: [true, "Frist name is required"],
    trim: true,
    maxlength: [20, "First name can not contain more than 20 characters"],
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: [20, "Last name can not contain more than 20 characters"],
  },
});
const userSchema = new Schema<TUser, UserModel, UserMethods>({
  userId: { type: Number, required: true },
  username: { type: String, required: true, trim: true },
  password: { type: String, required: true, select: false },
  fullName: { type: fullNameSchema, required: true },
  age: { type: Number, required: [true, "age is required"] },
  email: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  hobbies: { type: [String], required: true },
  address: { type: addressSchema, required: true },
  orders: { type: [ordersSchema] },
});

userSchema.pre("updateOne", async function (next) {
  if (this._update.$set && this._update.$set.password) {
    this._update.$set.password = await bcrypt.hash(
      this._update.$set.password,
      Number(config.bcrypt_salt_rounds)
    );
  }
  next();
});
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});
userSchema.post("save", async function (doc: any, next) {
  doc.password = undefined;
  next();
});

userSchema.methods.isUserExists = async function (userId: Number) {
  const existingUser = await User.findOne({ userId });
  return existingUser;
};

export const User = model<TUser, UserModel>("User", userSchema);
