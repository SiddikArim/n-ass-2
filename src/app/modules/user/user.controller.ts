import { Request, Response } from "express";
import { userServices } from "./user.service";
import { UserValidation } from "./user.validation";
import { TOrders, TUser } from "./user.interface";

const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;
    const validateUser = UserValidation.CreateUserValidationSchema.parse(user);
    const result = await userServices.createUserIntoDB(validateUser);
    res.status(200).json({
      success: true,
      message: "Student created successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      massage: err.message || "something went wrong",
      data: err,
    });
  }
};
const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUsersFromDB();
    res.status(200).json({
      success: true,
      message: "Students are retrived successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: err,
    });
  }
};
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userServices.getSingleUser(userId);
    res.status(200).json({
      success: true,
      message: "Student Got successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "No user found",
      data: err,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const newUserInformation: Partial<TUser> = req.body;

    const validatedUserData =
      UserValidation.UpdateUserValidationSchema.parse(newUserInformation);

    const result = await userServices.updateUserFromDB(
      userId,
      validatedUserData
    );

    res.status(200).json({
      suceess: true,
      message: "User updated successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || "Something went wrong!",
      error: {
        code: 404,
        description: error,
      },
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    await userServices.deleteUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
      data: null,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: "Something went wrong",
      error: {
        code: 404,
        description: err.message || "User not found",
      },
    });
  }
};

const addOrder = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const order: TOrders = req.body;
    const validateOrderData =
      UserValidation.CreateOrdersValidationSchema.parse(order);
    await userServices.addOrderIntoDB(userId, validateOrderData);
    res.status(200).json({
      success: true,
      message: "orders added successfully",
      data: null,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: "No user Found",
      error: {
        code: 404,
        description: err.message || "Something went wrong",
      },
    });
  }
};
const getAllOrders = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const orders = await userServices.getAllOrderFromDB(userId);
    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      data: orders,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "No user found",
      error: {
        code: 404,
        description: err.message,
      },
    });
  }
};
const getUserTotal = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const result = await userServices.getTotalPrice(userId);

    if (result.totalPrice === null) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found!",
        },
      });
    }

    res.status(200).json({
      success: true,
      message: "Total price calculated successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || "Something went wrong!",
      error: {
        code: 404,
        description: error,
      },
    });
  }
};

// send response

export const userController = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
  addOrder,
  getAllOrders,
  getUserTotal,
};
