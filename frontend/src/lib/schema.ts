
import { z } from 'zod';
 export const signInSchema = z.object({
     email:z.string().email("Invalid email address"),
     password:z.string().min(6, "password is required"),
 })
 export const signUpSchema = z.object({
     name: z.string().min(3, "Name at least 3 characters long"),
     email:z.string().email("Invalid email address"),
     password:z.string().min(8, "Password must be at least 8 characters long"),
     confirmPassword: z.string().min(8, "Confirm Password must be at least 8 characters long") 
 }).refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Passwords do not match",
  });
    
  export const resetPasswordSchema = z
  .object({
    newPassword: z.string().min(8, "Password must be 8 characters"),
    confirmPassword: z.string().min(8, "Password must be 8 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });


  export const forgotPasswordSchema = z.object({
    email: z.string().email("Invalid email address"),
  });
   

  export const workspaceSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    color: z.string().min(3, "Color must be at least 3 characters"),
    description: z.string().optional(),
  });
