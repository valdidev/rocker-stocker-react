import { useState, useContext } from "react";
import { apiCall } from "../../api/axios";
import { AuthContext } from "../../contexts/AuthContext2";
import { FiLogIn } from "react-icons/fi";
import { useForm } from "../../hooks/useForm";
import { ButtonWithLoader } from "../../common/ButtonWithLoader/ButtonWithLoader";
// import { toast } from "react-hot-toast";

export const SignIn = () => {
  const { handlerAuth } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);

  const initialForm = {
    email: "",
    password: "",
  };

  const { form, errors, handleChange, checkErrors } = useForm(initialForm);

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
    checkErrors(e);

    if (errors.email !== "" || errors.password !== "") return;

    trySignIn(bodyCredentials);
  };

  // const notify = () => toast.error("Here is your toast.");

  return (
    <div className="form container formContainer">
      <h1 className="text-center">Sign in</h1>
      {/* <button onClick={notify}>Make me a toast</button> */}

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
          required
        />
        <input
          className="form-control my-2"
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        {(errors?.email && (
          <p className="text-center text-danger">{errors.email}</p>
        )) ||
          (errors?.password && (
            <p className="text-center text-danger">{errors.password}</p>
          ))}

        <ButtonWithLoader
          isLoading={isLoading}
          IconButton={<FiLogIn size="2em" />}
        />
      </form>
    </div>
  );
};
