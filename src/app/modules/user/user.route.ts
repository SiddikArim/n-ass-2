import express from "express";
import { userController } from "./user.controller";

const router = express.Router();

// will call controller
router.post("/create-user", userController.createUser);
router.get("/", userController.getAllUser);
router.get("/:userId", userController.getSingleUser);
export const userRoutes = router;
