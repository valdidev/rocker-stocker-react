import { useState, useContext } from "react";
import { apiCall } from "../../api/axios";
import AuthContext from "../../contexts/AuthContext";

import '../../index.css';

export const SignIn = () => {
  
  // API
  const trySignIn = async (body) => {
    setIsLoading(true);
    try {
      let res = await apiCall("/auth/login", body, null, "post");
      setIsLoading(false);

      if (res.status === 200) {
        let user = res.data.user;
        handlerAuth(user);
      }
    } catch (error) {
      setIsLoading(false);
      setUserError(error.response.data.message);
    }
  };

  // HOOKS

  const { handlerAuth } = useContext(AuthContext);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [userError, setUserError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // HANDLERS
  const inputsHandler = (e) => {
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handlerSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    trySignIn(bodyCredentials);
    setIsLoading(false);
  };

  const bodyCredentials = {
    email: credentials.email,
    password: credentials.password,
  };

  const enableButton = !(
    userError === "" &&
    credentials.email.length > 8 &&
    credentials.password.length > 8
  );

  return (
    <div className="form container">
      <form
        onSubmit={handlerSubmit}
        className="d-flex flex-column align-items-center justify-content-center"
        noValidate
      >
        <h1 className="text-center">Sign in</h1>
        <input
          className="form-control my-2"
          name="email"
          type="email"
          placeholder="Email"
          onChange={(e) => inputsHandler(e)}
          onFocus={() => setUserError("")}
        />
        <input
          className="form-control my-2"
          name="password"
          type="password"
          placeholder="Password"
          onChange={(e) => inputsHandler(e)}
          onFocus={() => setUserError("")}
        />
        <p className="text-danger">{userError}</p>

        {!isLoading ? (
          <button
            className="btn-send btn btn-success btn-shadow w-100 my-4"
            disabled={enableButton}
          >
            Send
          </button>
        ) : (
          <button
            className="btn-send btn btn-success btn-shadow w-100 my-4"
            disabled={enableButton}
            type="button"
          >
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Send</span>
          </button>
        )}
      </form>
    </div>
  );
};
