import { UserModel } from "../user.model";
import { TUser } from "./user.interface";

const createUserIntoDB = async (user: TUser) => {
  const result = await UserModel.create(user);
  return result;
};
const getAllUsersFromDB = async () => {
  const result = await UserModel.find();
  return result;
};
const getSingleUser = async (userId: string) => {
  const result = await UserModel.findOne({ userId });
  return result;
};
export const userServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUser,
};
