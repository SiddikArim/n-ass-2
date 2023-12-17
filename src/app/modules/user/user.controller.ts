import { Request, Response } from "express";
import { userServices } from "./user.service";

const createUser = async (res: Response, req: Request) => {
  try {
    const { user: userData } = req.body;
    const result = await userServices.createUserIntoDB(userData);
    res.status(200).json({
      success: true,
      message: "Student created successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
  // send response
};
export const userController = {
  createUser,
};
