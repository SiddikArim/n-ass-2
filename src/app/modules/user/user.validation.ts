import { z } from "zod";

const CreateAddressValidationSchema = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
});

const CreateOrdersValidationSchema = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});

const CreateFullNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20),
  lastName: z.string().min(1).max(20),
});

const CreateUserValidationSchema = z.object({
  userId: z.number().positive(),
  username: z.string().min(1),
  password: z.string().min(1),
  fullName: CreateFullNameValidationSchema.required(),
  age: z.number().positive().min(1),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: CreateAddressValidationSchema.required(),
  orders: z.array(CreateOrdersValidationSchema).default([]),
});

const UpdateUserValidationSchema = z.object({
  username: z.string().min(1).optional(),
  password: z.string().min(1).optional(),
  fullName: CreateFullNameValidationSchema.optional(),
  age: z.number().positive().min(1).optional(),
  email: z.string().email().optional(),
  isActive: z.boolean().optional(),
  hobbies: z.array(z.string()).optional(),
  address: CreateAddressValidationSchema.optional(),
});

export const UserValidation = {
  CreateUserValidationSchema,
  UpdateUserValidationSchema,
  CreateOrdersValidationSchema,
};
