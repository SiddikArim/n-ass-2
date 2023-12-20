import { User } from "../user.model";
import { TUser } from "./user.interface";

const createUserIntoDB = async (userData: TUser) => {
  // const result = await User.create(user);
  const newUser = new User(userData);
  if (await newUser.isUserExists(userData.userId)) {
    throw new Error("User already exists");
  }
  const result = await newUser.save();

  return result;
};
const getAllUsersFromDB = async () => {
  const result = await User.find();
  return result;
};
const getSingleUser = async (userId: string) => {
  const result = await User.findOne({ userId });
  return result;
};
export const userServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUser,
};
