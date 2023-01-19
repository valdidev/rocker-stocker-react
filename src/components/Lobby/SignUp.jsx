import { useState } from "react";
import { apiCall } from "../../api/axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { BsBoxArrowInUp } from "react-icons/bs";
import "../../index.css";

export const SignUp = ({ switchFlag }) => {
  const [userError, setUserError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const trySignUp = async (body) => {
    setIsLoading(true);

    try {
      let res = await apiCall("/auth/register", body, null, "post");
      if (res.status === 200) {
        MySwal.fire({
          title: <strong>User created</strong>,
          icon: "success",
          confirmButtonText: "Sign In",
          confirmButtonColor: "#198754",
        });
      }

      setIsLoading(false);

      switchFlag();
    } catch (error) {
      setIsLoading(false);
      setUserError(error.response.data.message);
    }
  };

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    surname: "",
    phone: "",
  });

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
  };

  const formIsFilled = !(
    userError === "" &&
    credentials.email.length > 0 &&
    credentials.name.length > 0 &&
    credentials.password.length > 0 &&
    credentials.confirmPassword.length > 0
  );

  const MySwal = withReactContent(Swal);

  return (
    <div className="form container formContainer">
      <h1 className="text-center">Sign up</h1>

      <form
        onSubmit={handlerSubmit}
        className="lobbyForm lobbyForm_signup"
        noValidate
      >
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

        {isLoading ? (
          <button
            className="btn-send btn btn-success py-2 w-50"
            disabled={formIsFilled}
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
          <button
            className="btn-send btn btn-success py-2 w-50"
            disabled={formIsFilled}
          >
            <BsBoxArrowInUp size="2em" />
          </button>
        )}
      </form>
    </div>
  );
};
