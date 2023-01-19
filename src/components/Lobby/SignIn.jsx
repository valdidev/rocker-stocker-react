import { useState, useContext } from "react";
import { apiCall } from "../../api/axios";
import { AuthContext } from "../../contexts/AuthContext2";
import { FiLogIn } from "react-icons/fi";
import "../../index.css";
import { useForm } from "../../hooks/useForm";

export const SignIn = () => {
  const { handlerAuth } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);

  const initialForm = {
    email: "",
    password: "",
  };

  const { form, errors, handleChange, handleBlur } = useForm(initialForm);

  const bodyCredentials = {
    email: form.email,
    password: form.password,
  };

  const trySignIn = async (body) => {
    setIsLoading(true);

    try {
      let res = await apiCall("/auth/login", body, null, "post");

      if (res.status === 200) {
        let user = res.data.user;
        handlerAuth(user);
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const handlerSubmit = (e) => {
    e.preventDefault();

    if (errors.email !== "" || errors.password !== "") return;

    trySignIn(bodyCredentials);
  };

  return (
    <div className="form container formContainer">
      <h1 className="text-center">Sign in</h1>

      <form
        onSubmit={handlerSubmit}
        className="lobbyForm lobbyForm_signin"
        noValidate
      >
        <input
          className="form-control my-2"
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        <input
          className="form-control my-2"
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />

        {(errors?.email && (
          <p className="text-center text-danger">{errors.email}</p>
        )) ||
          (errors?.password && (
            <p className="text-center text-danger">{errors.password}</p>
          ))}

        {isLoading ? (
          <button
            className="btn-send btn btn-success btn-shadow w-50"
            type="button"
          >
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Send</span>
          </button>
        ) : (
          <button className="btn-send btn btn-success btn-shadow w-50">
            <FiLogIn size="2em" />
          </button>
        )}
      </form>
    </div>
  );
};
