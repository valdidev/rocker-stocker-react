import { useState } from "react";
import { apiCall } from "../../api/axios";
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
    if (formIsFilled) return setUserError("Fill in the text fields");
    if (credentials.password !== credentials.confirmPassword)
      return setUserError("Passwords do not match");
    trySignUp(bodyRegister);
  };

  const bodyRegister = {
    email: credentials.email,
    password: credentials.password,
    name: credentials.name,
    surname: credentials.surname,
    phone: credentials.phone,
  };

  const formIsFilled = !(
    userError === "" &&
    credentials.email.length > 0 &&
    credentials.name.length > 0 &&
    credentials.surname.length > 0 &&
    credentials.phone.length > 0 &&
    credentials.password.length > 0 &&
    credentials.confirmPassword.length > 0
  );

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
          onFocus={() => setUserError("")}
        />
        <input
          className="form-control my-2"
          type="text"
          placeholder="Surname"
          name="surname"
          onChange={(e) => inputsHandler(e)}
          onFocus={() => setUserError("")}
        />
        <input
          className="form-control my-2"
          type="text"
          placeholder="Phone"
          name="phone"
          onChange={(e) => inputsHandler(e)}
          onFocus={() => setUserError("")}
        />
        <input
          className="form-control my-2"
          type="email"
          placeholder="Email"
          name="email"
          onChange={(e) => inputsHandler(e)}
          onFocus={() => setUserError("")}
        />
        <input
          className="form-control my-2"
          type="password"
          placeholder="Password"
          name="password"
          onChange={(e) => inputsHandler(e)}
          onFocus={() => setUserError("")}
        />
        <input
          className="form-control my-2"
          type="password"
          placeholder="Confirm password"
          name="confirmPassword"
          onChange={(e) => inputsHandler(e)}
          onFocus={() => setUserError("")}
        />
        <p className="text-danger">{userError}</p>
        <button
          className="btn-send btn btn-success btn-shadow w-100 my-4"
          disabled={formIsFilled}
        >
          Send
        </button>
      </form>
    </div>
  );
};
