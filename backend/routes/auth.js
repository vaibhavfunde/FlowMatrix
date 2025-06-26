import express from 'express';
import {z} from 'zod';
import { validateRequest } from 'zod-express-middleware';
import { loginSchema, registerSchema, verifyEmailSchema ,resetPasswordSchema,emailSchema } from '../libs/validate-schema.js';
import { loginUser, registeruser, verifyEmail,resetPasswordRequest  ,verifyResetPasswordTokenAndResetPassword} from '../controller/auth-controller.js';
//import { verify } from 'jsonwebtoken';

const router = express.Router();

router.post("/register",
validateRequest({
    body :registerSchema,
}),
    registeruser
)

router.post("/login",
    validateRequest({
        body :loginSchema,
    }),
        loginUser
    )

    router.post(
        "/verify-email",
        validateRequest({
            body :verifyEmailSchema,
        }),
           verifyEmail 
        )

        router.post(
            "/reset-password-request",
            validateRequest({
              body: emailSchema
            }),
            
            resetPasswordRequest
          );

          router.post(
            "/reset-password",
            validateRequest({
              body: resetPasswordSchema,
            }),
            verifyResetPasswordTokenAndResetPassword
          );
          

export default router;