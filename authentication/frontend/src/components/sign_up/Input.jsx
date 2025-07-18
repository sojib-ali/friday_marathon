export const Input = ({
  label,
  id,
  type = "text",
  register,
  error,
  ...rest
}) => {
  return (
    <div className="signup-form__group">
      <label htmlFor=""> {label} </label>
      <input
        type={type}
        id={id}
        className="signup-form__input"
        {...register}
        {...rest}
      />
      {error && <p className="error"> {error.message} </p>}
    </div>
  );
};
