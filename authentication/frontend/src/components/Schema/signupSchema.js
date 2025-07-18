// signupSchema.js
import { z } from "zod";

export const signupSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "First name must be at least 2 characters")
      .max(50, "First name must be at most 50 characters"),

    lastName: z
      .string()
      .min(2, "Last name must be at least 2 characters")
      .max(50, "Last name must be at most 50 characters"),

    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must be at most 20 characters")
      .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),

    email: z.email("Invalid email address"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(50,"password must not exceed 50 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character"),

    confirmPassword: z.string(),
    dobMonth: z.string().nonempty("Month is required"),
    dobDay: z.string().nonempty("Day is required"),
    dobYear: z.string().nonempty("Year is required"),
    
    gender: z.string().nonempty("Gender is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine(
    (data) => {
      const { dobYear, dobMonth, dobDay } = data;
      // This check only runs if all DOB fields are present.
      // Other rules will catch missing fields.
      if (!dobYear || !dobMonth || !dobDay) {
        return true;
      }

      const year = parseInt(dobYear, 10);
      const month = parseInt(dobMonth, 10) - 1; // JS months are 0-indexed
      const day = parseInt(dobDay, 10);
      const dob = new Date(year, month, day);

      // Check for invalid dates (e.g., Feb 30 will become Mar 1/2)
      if (dob.getFullYear() !== year || dob.getMonth() !== month || dob.getDate() !== day) {
        return false; // This will trigger the error message for an invalid date
      }

      const today = new Date();
      const thirteenYearsAgo = new Date(
        today.getFullYear() - 13,
        today.getMonth(),
        today.getDate()
      );

      // The user's date of birth must be on or before this date.
      return dob <= thirteenYearsAgo;
    },
    {
      message: "You must be at least 13 years old to sign up.",
      path: ["dobYear"], // Point the error to the year field for clarity
    }
  );
