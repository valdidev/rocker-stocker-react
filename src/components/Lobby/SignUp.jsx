import { useState } from "react";
import "./signin-signup.css";

export const SignUp = () => {
  // API
  const trySignUp = async (body) => {
    try {
      let res = await apiCall("/auth/register", body, null, "post");
      console.log(res);
    } catch (error) {
      setUserError(error.response.data.message);
    }
  };

  // HOOKS
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    surname: "",
    phone: "",
  });

  const [userError, setUserError] = useState("");

  // HANDLERS
  const inputsHandler = (e) => {
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    trySignUp(bodyRegister);
  };

  const bodyRegister = {
    email: credentials.email,
    password: credentials.password,
    confirmPassword: credentials.confirmPassword,
    name: credentials.name,
    surname: credentials.surname,
    phone: credentials.phone,
  };

  /* const enableButton = !(
    userError === "" &&
    credentials.email.length > 8 &&
    credentials.password.length > 8
  ); */

  return (
    <div className="form container form-container d-flex flex-column align-items-center">
      <form
        onSubmit={handlerSubmit}
        className="d-flex flex-column align-items-center justify-content-center"
        noValidate
      >
        <h1 className="text-center">Sign up</h1>
        <input
          className="form-control my-2"
          type="text"
          placeholder="Name"
          name="name"
          onChange={(e) => inputsHandler(e)}
        />
        <input
          className="form-control my-2"
          type="text"
          placeholder="Surname"
          name="surname"
          onChange={(e) => inputsHandler(e)}
        />
        <input
          className="form-control my-2"
          type="text"
          placeholder="Phone"
          name="phone"

          onChange={(e) => inputsHandler(e)}
        />
        <input
          className="form-control my-2"
          type="email"
          placeholder="Email"
          name="email"
          onChange={(e) => inputsHandler(e)}
        />
        <input
          className="form-control my-2"
          type="password"
          placeholder="Password"
          name="password"
          onChange={(e) => inputsHandler(e)}
        />
        <input
          className="form-control my-2"
          type="password"
          placeholder="Confirm password"
          name="confirmPassword"
          onChange={(e) => inputsHandler(e)}
        />
        <button className="btn-send btn btn-success btn-shadow w-100 my-4">
          Send
        </button>
      </form>
    </div>
  );
};
