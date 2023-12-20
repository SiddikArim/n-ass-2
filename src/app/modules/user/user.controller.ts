import { Request, Response } from "express";
import { userServices } from "./user.service";
import UserValidationSchema from "./user.validation";

const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;
    const validateUser = UserValidationSchema.parse(user);
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
// send response

export const userController = {
  createUser,
  getAllUser,
  getSingleUser,
};
