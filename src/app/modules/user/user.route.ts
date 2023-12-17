import express from "express";
import { userController } from "./user.controller";

const router = express.Router();

// will call controller
router.post("/create-user", userController.createUser);

export const StudentRoutes = router;
