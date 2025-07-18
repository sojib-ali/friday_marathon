import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../Schema/signupSchema";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { years, months, getDaysInMonth } from "../../utills/dobUtils";
import { Input } from "./Input";

import "./signup.css";
import { useState } from "react";

export const SignUp = () => {
  const [showPassword, setShowPassword] = useState({
    showJustPassword: false,
    showConfirmPassword: false,
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(signupSchema), mode: "all" });

  const onSubmit = (data) => {
    console.log("Form data: ", data);
    alert("account created");
  };

  const selectedMonth = watch("dobMonth");
  const selectedYear = watch("dobYear");

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
        <h3 className="signup-form__title">Sign up </h3>

        {/* First Name */}
        <Input
          label="first Name"
          id="firstName"
          register={register("firstName")}
          error={errors.firstName}
        />

        {/* Last Name */}
        <Input
          label="Last Name"
          id="lastName"
          register={register("lastName")}
          error={errors.lastName}
        />

        {/* Username */}
        <div className="signup-form__group">
          <label className="signup-form__label" htmlFor="username">
            Username
          </label>
          <input
            className="signup-form__input"
            id="username"
            type="text"
            {...register("username")}
          />
          {errors.username && (
            <p className="error">{errors.username.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="signup-form__group">
          <label className="signup-form__label" htmlFor="email">
            Email
          </label>
          <input
            className="signup-form__input"
            id="email"
            type="email"
            {...register("email")}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        {/* DOB */}
        <div className="signup-form__group">
          <label className="signup-form__label" htmlFor="dob">
            Date of Birth
          </label>
          <div className="signup-form__dob-group">
            {/* Month */}
            <select
              className="signup-form__select"
              defaultValue=""
              {...register("dobMonth")}
            >
              <option value="" disabled>
                Month
              </option>
              {months.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.name}
                </option>
              ))}
            </select>

            {/* Day */}
            <select
              className="signup-form__select"
              defaultValue=""
              {...register("dobDay")}
            >
              <option value="" disabled>
                Day
              </option>
              {Array.from(
                {
                  length: getDaysInMonth(selectedMonth, selectedYear),
                },
                (_, i) => i + 1
              ).map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>

            {/* Year */}
            <select
              className="signup-form__select"
              defaultValue=""
              {...register("dobYear")}
            >
              <option value="" disabled>
                Year
              </option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          {(errors.dobMonth || errors.dobDay || errors.dobYear) && (
            <p className="error">
              {errors.dobMonth?.message ||
                errors.dobDay?.message ||
                errors.dobYear?.message}
            </p>
          )}
        </div>

        {/* Gender */}
        <div className="signup-form__group">
          <label className="signup-form__label">Gender</label>
          <select
            className="signup-form__select"
            defaultValue=""
            {...register("gender")}
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <p className="error">{errors.gender.message}</p>}
        </div>

        {/* Password */}
        <div className="signup-form__group">
          <label className="signup-form__label" htmlFor="password">
            Password
          </label>
          <div className="signup-form__password-wrapper">
            <input
              className="signup-form__input"
              id="password"
              type={showPassword.showJustPassword ? "text" : "password"}
              {...register("password")}
            />
            <span
              className="signup-form__toggle"
              onClick={() =>
                setShowPassword((prev) => ({
                  ...prev,
                  showJustPassword: !prev.showJustPassword,
                }))
              }
            >
              {showPassword.showJustPassword ? <GoEyeClosed /> : <GoEye />}
            </span>
          </div>
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="signup-form__group">
          <label className="signup-form__label" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <div className="signup-form__password-wrapper">
            <input
              className="signup-form__input"
              id="confirmPassword"
              type={showPassword.showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword")}
            />
            <span
              className="signup-form__toggle"
              onClick={() =>
                setShowPassword((prev) => ({
                  ...prev,
                  showConfirmPassword: !prev.showConfirmPassword,
                }))
              }
            >
              {showPassword.showConfirmPassword ? <GoEyeClosed /> : <GoEye />}
            </span>
          </div>
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Submit */}
        <div className="signup-form__actions">
          <button
            type="submit"
            className="signup-form__button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Account"}
          </button>
          {errors.root && (
            <p className="signup-form__error-message">{errors.root.message}</p>
          )}
        </div>
      </form>
    </>
  );
};
