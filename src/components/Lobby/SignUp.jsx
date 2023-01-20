import { useState } from "react";
import { apiCall } from "../../api/axios";
import { BsBoxArrowInUp } from "react-icons/bs";
import { useForm } from "../../hooks/useForm";
import { ButtonWithLoader } from "../../common/ButtonWithLoader/ButtonWithLoader";
import { axiosErrorNotification } from "../../utils/notificationMatcher";

export const SignUp = ({ switchFlag }) => {
  const [isLoading, setIsLoading] = useState(false);

  const initialForm = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const { form, errors, handleChange, checkErrors } = useForm(initialForm);

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
      axiosErrorNotification(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    checkErrors(e);

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
          required
        />

        <input
          className="form-control my-2"
          type="email"
          placeholder="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          className="form-control my-2"
          type="password"
          placeholder="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <input
          className="form-control my-2"
          type="password"
          placeholder="Confirm password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
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

        <ButtonWithLoader
          isLoading={isLoading}
          IconButton={<BsBoxArrowInUp size="2em" />}
        />
      </form>
    </div>
  );
};
