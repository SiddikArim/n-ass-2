import { User } from "../user.model";
import { TOrders, TUser } from "./user.interface";

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
const updateUserFromDB = async (
  userId: number,
  newUserInformation: Partial<TUser>
) => {
  const checkUser = new User(newUserInformation);
  if (!(await checkUser.isUserExists(userId))) {
    throw new Error("User not found!");
  }

  await User.updateOne(
    { userId: userId },
    {
      $set: {
        username: newUserInformation.username,
        password: newUserInformation.password,
        fullName: newUserInformation.fullName,
        age: newUserInformation.age,
        email: newUserInformation.email,
        isActive: newUserInformation.isActive,
        hobbies: newUserInformation.hobbies,
        address: newUserInformation.address,
      },
    }
  );

  const updatedUser = await User.findOne(
    { userId: userId },
    {
      userId: 1,
      username: 1,
      password: 1,
      "fullName.firstName": 1,
      "fullName.lastName": 1,
      age: 1,
      email: 1,
      isActive: 1,
      hobbies: 1,
      "address.street": 1,
      "address.city": 1,
      "address.country": 1,
      _id: 0,
    }
  );
  console.log(updatedUser);
  return updatedUser;
};
const deleteUserFromDB = async (userId: number) => {
  const deleteUser = new User<TUser>();
  if (!(await deleteUser.isUserExists(userId))) {
    throw new Error("User does not exist");
  } else {
    const result = User.deleteOne({ userId: userId });
    return result;
  }
};

const addOrderIntoDB = async (userId: number, order: TOrders) => {
  const userCheck = new User();
  if (!(await userCheck.isUserExists(userId))) {
    throw new Error("User does not exists");
  } else {
    await User.updateOne({ userId: userId }, { $push: { orders: order } });
    const result = User.findOne({ userId: userId }, { orders: 1 });
    return result;
  }
};

const getAllOrderFromDB = async (userId: number) => {
  const getAllOrdersFromUser = new User();
  if (!(await getAllOrdersFromUser.isUserExists(userId))) {
    throw new Error("User not found");
  } else {
    const getAllOrdersOfUser = await User.findOne({ userId }, { orders: 1 });
    return getAllOrdersOfUser;
  }
};
const getTotalPriceFromDB = async (userId: number) => {
  const checkUser = new User();
  if (!(await checkUser.isUserExists(userId))) {
    throw new Error("No user Found");
  } else {
    const user = await User.findOne({ userId });
    if (!user || !user.orders || user.orders.length === 0) {
      return { totalPrice: null };
    }
    const sum = user?.orders.reduce(
      (acc, order) => acc + order.price * order.quantity,
      0
    );
    return { totalPrice: sum };
  }
};
export const userServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUser,
  updateUserFromDB,
  deleteUserFromDB,
  addOrderIntoDB,
  getAllOrderFromDB,
  getTotalPrice: getTotalPriceFromDB,
};
