import { useState } from "react";
import { apiCall } from "../../api/axios";
import "./signin-signup.css";

export const SignIn = () => {
  // API
  const trySignIn = async (body) => {
    try {
      let res = await apiCall("/auth/login", body, null, "post");
      console.log(res);
    } catch (error) {
      setUserError(error.response.data.message);
    }
  };

  // HOOKS
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
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
    trySignIn(bodyCredentials);
  };

  const bodyCredentials = {
    email: credentials.email,
    password: credentials.password,
  };

  /*  const validateBody = () => {
    if (
      body.email !== "" &&
      body.password &&
      userError.emailError === "" &&
      userError.passwordError === ""
    ) {
      return true;
    }
  }; */

  return (
    <div className="form container">
      <form
        onSubmit={handlerSubmit}
        className="d-flex flex-column align-items-center justify-content-center"
      >
        <h1 className="text-center">Sign in</h1>
        <input
          className="form-control my-2"
          name="email"
          type="email"
          placeholder="Email"
          onChange={(e) => inputsHandler(e)}
        />
        <input
          className="form-control my-2"
          name="password"
          type="password"
          placeholder="Password"
          onChange={(e) => inputsHandler(e)}
        />
        <p className="text-danger">{userError}</p>
        <button className="btn-send btn btn-success btn-shadow w-100 my-4">
          Send
        </button>
      </form>
    </div>
  );
};
