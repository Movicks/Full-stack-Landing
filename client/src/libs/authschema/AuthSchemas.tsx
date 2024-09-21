// AuthSchemas.tsx
import { z } from "zod";

const uppercaseRegex = /(?=.*[A-Z])/;
const lowercaseRegex = /(?=.*[a-z])/;
const digitRegex = /(?=.*\d)/;
const specialCharRegex = /(?=.*[@$!%*?&])/;

const emailSchema = z
  .string()
  .email({ message: "Invalid Email Address" })
  .transform((email) => email.toLowerCase())
  .refine(
    (email) => {
      const [localPart] = email.split("@");
      return localPart && localPart.length >= 2;
    },
    {
      message:
        "Your Email must have at least 2 characters before the '@' symbol",
    },
  );

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .regex(uppercaseRegex, "Password must include at least one uppercase letter")
  .regex(lowercaseRegex, "Password must include at least one lowercase letter")
  .regex(digitRegex, "Password must include at least one digit")
  .regex(
    specialCharRegex,
    "Password must include at least one special character (@$!%*?&)",
  );

export const loginSchema = z.object({
  email: z.string().min(3, "Username must be at least 3 characters long"),
  password: passwordSchema,
});

export const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  email: emailSchema,
  password: passwordSchema,
});
