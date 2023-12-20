import { Schema, model } from "mongoose";
import {
  TAddress,
  TFullName,
  TOrders,
  TUser,
  UserMethods,
  UserModel,
} from "./user/user.interface";

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
    // validate: {
    //   validator: function (value: string) {
    //     const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
    //     return firstNameStr === value;
    //   },
    //   message: "{VALUE} is not in capitalize format",
    // },
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: [20, "Last name can not contain more than 20 characters"],
    // validate: {
    //   validator: function (value: string) {
    //     const lastNameStr = value.charAt(0).toUpperCase() + value.slice(1);
    //     return lastNameStr === value;
    //   },
    //   message: "{VALUE} is not in capitalize format",
    // },
  },
});
const userSchema = new Schema<TUser, UserModel, UserMethods>({
  userId: { type: Number, required: true },
  username: { type: String, required: true, trim: true },
  password: { type: String, required: true },
  fullName: { type: fullNameSchema, required: true },
  age: { type: Number, required: [true, "age is required"] },
  email: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  hobbies: { type: [String], required: true },
  address: { type: addressSchema, required: true },
  orders: { type: [ordersSchema], required: true },
});

userSchema.methods.isUserExists = async function (userId: Number) {
  const existingUser = await User.findOne({ userId });
  return existingUser;
};

export const User = model<TUser, UserModel>("User", userSchema);
