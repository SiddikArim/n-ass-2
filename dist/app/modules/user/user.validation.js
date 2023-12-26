"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const CreateAddressValidationSchema = zod_1.z.object({
    street: zod_1.z.string(),
    city: zod_1.z.string(),
    country: zod_1.z.string(),
});
const CreateOrdersValidationSchema = zod_1.z.object({
    productName: zod_1.z.string(),
    price: zod_1.z.number(),
    quantity: zod_1.z.number(),
});
const CreateFullNameValidationSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1).max(20),
    lastName: zod_1.z.string().min(1).max(20),
});
const CreateUserValidationSchema = zod_1.z.object({
    userId: zod_1.z.number().positive(),
    username: zod_1.z.string().min(1),
    password: zod_1.z.string().min(1),
    fullName: CreateFullNameValidationSchema.required(),
    age: zod_1.z.number().positive().min(1),
    email: zod_1.z.string().email(),
    isActive: zod_1.z.boolean(),
    hobbies: zod_1.z.array(zod_1.z.string()),
    address: CreateAddressValidationSchema.required(),
    orders: zod_1.z.array(CreateOrdersValidationSchema).default([]),
});
const UpdateUserValidationSchema = zod_1.z.object({
    username: zod_1.z.string().min(1).optional(),
    password: zod_1.z.string().min(1).optional(),
    fullName: CreateFullNameValidationSchema.optional(),
    age: zod_1.z.number().positive().min(1).optional(),
    email: zod_1.z.string().email().optional(),
    isActive: zod_1.z.boolean().optional(),
    hobbies: zod_1.z.array(zod_1.z.string()).optional(),
    address: CreateAddressValidationSchema.optional(),
});
exports.UserValidation = {
    CreateUserValidationSchema,
    UpdateUserValidationSchema,
    CreateOrdersValidationSchema,
};
