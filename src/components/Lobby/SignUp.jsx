import { useState } from "react";
import { apiCall } from "../../api/axios";
import { BsBoxArrowInUp } from "react-icons/bs";
import { useForm } from "../../hooks/useForm";
import "../../index.css";

export const SignUp = ({ switchFlag }) => {
  const [isLoading, setIsLoading] = useState(false);

  const initialForm = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const { form, errors, handleChange, handleBlur } = useForm(initialForm);

  const bodyRegister = {
    email: form.email,
    password: form.password,
    name: form.name,
  };

  const trySignUp = async (body) => {
    setIsLoading(true);

    try {
      await apiCall("/auth/register", body, null, "post");

      setIsLoading(false);

      switchFlag();
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      errors?.name !== "" ||
      errors.email !== "" ||
      errors.password !== "" ||
      errors.confirmPassword !== ""
    )
      return;

    trySignUp(bodyRegister);
  };

  return (
    <div className="form container formContainer">
      <h1 className="text-center">Sign up</h1>

      <form
        onSubmit={handleSubmit}
        className="lobbyForm lobbyForm_signup"
        noValidate
      >
        <input
          className="form-control my-2"
          type="text"
          placeholder="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />

        <input
          className="form-control my-2"
          type="email"
          placeholder="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />

        <input
          className="form-control my-2"
          type="password"
          placeholder="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />

        <input
          className="form-control my-2"
          type="password"
          placeholder="Confirm password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />

        {(errors?.name && (
          <p className="text-center text-danger">{errors.name}</p>
        )) ||
          (errors?.email && (
            <p className="text-center text-danger">{errors.email}</p>
          )) ||
          (errors?.password && (
            <p className="text-center text-danger">{errors.password}</p>
          )) ||
          (errors?.confirmPassword && (
            <p className="text-center text-danger">{errors.confirmPassword}</p>
          ))}

        {isLoading ? (
          <button className="btn-send btn btn-success py-2 w-50" type="button">
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Send</span>
          </button>
        ) : (
          <button className="btn-send btn btn-success py-2 w-50">
            <BsBoxArrowInUp size="2em" />
          </button>
        )}
      </form>
    </div>
  );
};
