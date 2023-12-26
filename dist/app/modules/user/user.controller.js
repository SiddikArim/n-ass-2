"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("./user.service");
const user_validation_1 = require("./user.validation");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user } = req.body;
        const validateUser = user_validation_1.UserValidation.CreateUserValidationSchema.parse(user);
        const result = yield user_service_1.userServices.createUserIntoDB(validateUser);
        res.status(200).json({
            success: true,
            message: "Student created successfully",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            massage: err.message || "something went wrong",
            data: err,
        });
    }
});
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.userServices.getAllUsersFromDB();
        res.status(200).json({
            success: true,
            message: "Students are retrived successfully",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            data: err,
        });
    }
});
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_service_1.userServices.getSingleUser(userId);
        res.status(200).json({
            success: true,
            message: "Student Got successfully",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "No user found",
            data: err,
        });
    }
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.userId);
        const newUserInformation = req.body;
        const validatedUserData = user_validation_1.UserValidation.UpdateUserValidationSchema.parse(newUserInformation);
        const result = yield user_service_1.userServices.updateUserFromDB(userId, validatedUserData);
        res.status(200).json({
            suceess: true,
            message: "User updated successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message || "Something went wrong!",
            error: {
                code: 404,
                description: error,
            },
        });
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.userId);
        yield user_service_1.userServices.deleteUserFromDB(userId);
        res.status(200).json({
            success: true,
            message: "User deleted successfully!",
            data: null,
        });
    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: "Something went wrong",
            error: {
                code: 404,
                description: err.message || "User not found",
            },
        });
    }
});
const addOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.userId);
        const order = req.body;
        const validateOrderData = user_validation_1.UserValidation.CreateOrdersValidationSchema.parse(order);
        yield user_service_1.userServices.addOrderIntoDB(userId, validateOrderData);
        res.status(200).json({
            success: true,
            message: "orders added successfully",
            data: null,
        });
    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: "No user Found",
            error: {
                code: 404,
                description: err.message || "Something went wrong",
            },
        });
    }
});
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.userId);
        const orders = yield user_service_1.userServices.getAllOrderFromDB(userId);
        res.status(200).json({
            success: true,
            message: "Orders fetched successfully",
            data: orders,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "No user found",
            error: {
                code: 404,
                description: err.message,
            },
        });
    }
});
const getUserTotal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.userId);
        const result = yield user_service_1.userServices.getTotalPrice(userId);
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
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message || "Something went wrong!",
            error: {
                code: 404,
                description: error,
            },
        });
    }
});
// send response
exports.userController = {
    createUser,
    getAllUser,
    getSingleUser,
    updateUser,
    deleteUser,
    addOrder,
    getAllOrders,
    getUserTotal,
};
