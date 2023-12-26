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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../config"));
const addressSchema = new mongoose_1.Schema({
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
});
const ordersSchema = new mongoose_1.Schema({
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
});
const fullNameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, "Frist name is required"],
        trim: true,
        maxlength: [20, "First name can not contain more than 20 characters"],
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxlength: [20, "Last name can not contain more than 20 characters"],
    },
});
const userSchema = new mongoose_1.Schema({
    userId: { type: Number, required: true },
    username: { type: String, required: true, trim: true },
    password: { type: String, required: true, select: false },
    fullName: { type: fullNameSchema, required: true },
    age: { type: Number, required: [true, "age is required"] },
    email: { type: String, required: true },
    isActive: { type: Boolean, required: true },
    hobbies: { type: [String], required: true },
    address: { type: addressSchema, required: true },
    orders: { type: [ordersSchema] },
});
userSchema.pre("updateOne", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this._update.$set && this._update.$set.password) {
            this._update.$set.password = yield bcrypt_1.default.hash(this._update.$set.password, Number(config_1.default.bcrypt_salt_rounds));
        }
        next();
    });
});
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.password = yield bcrypt_1.default.hash(this.password, Number(config_1.default.bcrypt_salt_rounds));
        next();
    });
});
userSchema.post("save", function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        doc.password = undefined;
        next();
    });
});
userSchema.methods.isUserExists = function (userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield exports.User.findOne({ userId });
        return existingUser;
    });
};
exports.User = (0, mongoose_1.model)("User", userSchema);
