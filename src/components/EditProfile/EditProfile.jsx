import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosPatch } from "../../api/axios";
import { ButtonSpinner } from "../../common/ButtonSpinner/ButtonSpinner";
import { MdDone } from "react-icons/md";
import { AuthContext } from "../../contexts/AuthContext2";
import { useForm } from "../../hooks/useForm";
import "./editProfile.css";

export const EditProfile = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const { user } = useContext(AuthContext);

  const { form, errors, handleChange, handleBlur } = useForm(
    state?.editableProfile
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (errors?.name !== "" || errors.surname !== "" || errors.phone !== "") {
      return;
    };

    setIsLoading(true);

    let bodyToUpdateProfile = {
      name: form?.name,
      surname: form?.surname,
      phone: form?.phone,
      email: user?.email,
    };

    axiosPatch("user/modify", "", bodyToUpdateProfile, user?.jwt)
      .then((data) => {
        console.log(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      })
      .finally(() => navigate(-1));
  };

  return (
    <div className="editProfileDesign container">
      <h3 className="editProfileDesign_header text-center text-black">
        Edit profile of {user?.email}
      </h3>
      <form
        className="editProfileDesign_form container"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="mb-3 editProfileDesign_form_inputContainer">
          <label htmlFor="inputName" className="form-label fw-bold">
            Name
          </label>
          <input
            className="form-control"
            id="inputName"
            aria-describedby="nameHelp"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
        </div>

        {errors?.name && (
          <p className="text-center text-danger">{errors.name}</p>
        )}

        <div className="mb-3 editProfileDesign_form_inputContainer">
          <label htmlFor="inputSurname" className="form-label fw-bold">
            Surname
          </label>
          <input
            className="form-control"
            id="inputSurname1"
            aria-describedby="surnameHelp"
            type="text"
            name="surname"
            value={form.surname || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
        </div>

        {errors?.surname && (
          <p className="text-center text-danger">{errors.surname}</p>
        )}

        <div className="mb-3 editProfileDesign_form_inputContainer">
          <label htmlFor="inputPhone" className="form-label fw-bold">
            Phone
          </label>
          <input
            className="form-control"
            id="inputPhone"
            aria-describedby="phoneHelp"
            type="text"
            name="phone"
            value={form.phone || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
        </div>

        {errors?.phone && (
          <p className="text-center text-danger">{errors.phone}</p>
        )}

        <div className="d-flex text-center justify-content-center editProfileDesign_btn">
          {!isLoading ? (
            <button type="submit" className="btn btn-primary py-2 px-4">
              <MdDone fontSize="1.5em" />
            </button>
          ) : (
            <ButtonSpinner />
          )}
        </div>
      </form>
    </div>
  );
};
