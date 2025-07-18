import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../Schema/signupSchema";
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";

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
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(signupSchema), mode: "all" });

  const onSubmit = (data) => {
    console.log("Form data: ", data);

    alert("account created");
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
        <h3 className="signup-form__title">Sign up </h3>
        <div className="signup-form__group">
          <label className="signup-form__label" htmlFor="firstName">
            First Name
          </label>
          <input
            className="signup-form__input"
            id="firstName"
            type="text"
            {...register("firstName")}
          />
          {errors.firstName && (
            <p className="error"> {errors.firstName.message} </p>
          )}
        </div>
        <div className="signup-form__group">
          <label className="signup-form__label" htmlFor="lastName">
            Last Name
          </label>
          <input
            className="signup-form__input"
            id="lastName"
            type="text"
            {...register("lastName")}
          />
          {errors.lastName && (
            <p className="error"> {errors.lastName.message} </p>
          )}
        </div>
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
            <p className="error"> {errors.username.message} </p>
          )}
        </div>
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
          {errors.email && <p className="error"> {errors.email.message} </p>}
        </div>
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
              {showPassword ? <GoEye /> : <GoEyeClosed />}
            </span>
          </div>

          {errors.password && (
            <p className="error"> {errors.password.message} </p>
          )}
        </div>
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
              {showPassword ? <GoEye /> : <GoEyeClosed />}
            </span>
          </div>
          {errors.confirmPassword && (
            <p className="error"> {errors.confirmPassword.message} </p>
          )}
        </div>

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
