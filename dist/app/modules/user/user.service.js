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
exports.userServices = void 0;
const user_model_1 = require("../user.model");
const createUserIntoDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    // const result = await User.create(user);
    const newUser = new user_model_1.User(userData);
    if (yield newUser.isUserExists(userData.userId)) {
        throw new Error("User already exists");
    }
    const result = yield newUser.save();
    return result;
});
const getAllUsersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find();
    return result;
});
const getSingleUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOne({ userId });
    return result;
});
const updateUserFromDB = (userId, newUserInformation) => __awaiter(void 0, void 0, void 0, function* () {
    const checkUser = new user_model_1.User(newUserInformation);
    if (!(yield checkUser.isUserExists(userId))) {
        throw new Error("User not found!");
    }
    yield user_model_1.User.updateOne({ userId: userId }, {
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
    });
    const updatedUser = yield user_model_1.User.findOne({ userId: userId }, {
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
    });
    console.log(updatedUser);
    return updatedUser;
});
const deleteUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteUser = new user_model_1.User();
    if (!(yield deleteUser.isUserExists(userId))) {
        throw new Error("User does not exist");
    }
    else {
        const result = user_model_1.User.deleteOne({ userId: userId });
        return result;
    }
});
const addOrderIntoDB = (userId, order) => __awaiter(void 0, void 0, void 0, function* () {
    const userCheck = new user_model_1.User();
    if (!(yield userCheck.isUserExists(userId))) {
        throw new Error("User does not exists");
    }
    else {
        yield user_model_1.User.updateOne({ userId: userId }, { $push: { orders: order } });
        const result = user_model_1.User.findOne({ userId: userId }, { orders: 1 });
        return result;
    }
});
const getAllOrderFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const getAllOrdersFromUser = new user_model_1.User();
    if (!(yield getAllOrdersFromUser.isUserExists(userId))) {
        throw new Error("User not found");
    }
    else {
        const getAllOrdersOfUser = yield user_model_1.User.findOne({ userId }, { orders: 1 });
        return getAllOrdersOfUser;
    }
});
const getTotalPriceFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const checkUser = new user_model_1.User();
    if (!(yield checkUser.isUserExists(userId))) {
        throw new Error("No user Found");
    }
    else {
        const user = yield user_model_1.User.findOne({ userId });
        if (!user || !user.orders || user.orders.length === 0) {
            return { totalPrice: null };
        }
        const sum = user === null || user === void 0 ? void 0 : user.orders.reduce((acc, order) => acc + order.price * order.quantity, 0);
        return { totalPrice: sum };
    }
});
exports.userServices = {
    createUserIntoDB,
    getAllUsersFromDB,
    getSingleUser,
    updateUserFromDB,
    deleteUserFromDB,
    addOrderIntoDB,
    getAllOrderFromDB,
    getTotalPrice: getTotalPriceFromDB,
};
