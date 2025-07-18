import { z } from "zod";

export const signupSchema = z
  .object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    dobMonth: z.string().min(1, { message: "Month is required" }),
    dobDay: z.string().min(1, { message: "Day is required" }),
    dobYear: z.string().min(1, { message: "Year is required" }),
    gender: z.string().min(1, { message: "Please select a gender" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
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