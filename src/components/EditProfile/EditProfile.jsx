import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosPatch } from "../../api/axios";
import { ButtonSpinner } from "../../common/ButtonSpinner/ButtonSpinner";
import { MdDone } from "react-icons/md";

import "./editProfile.css";

export const EditProfile = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(state.editableProfile || null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    setIsLoading(true);

    e.preventDefault();
    let bodyToUpdateProfile = {
      name: user.name,
      surname: user.surname,
      phone: user.phone,
      email: user.email,
    };

    axiosPatch("user/modify", "", bodyToUpdateProfile)
      .then((data) => console.log(data))
      .catch((error) => console.log(error))
      .finally(() => navigate(-1));
  };

  return (
    <div className="editProfileDesign container">
      <h3 className="text-center text-white st-back-rs py-3">
        Edit profile of {user.email}
      </h3>
      <form className="editProfileDesign_form container" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="inputName" className="form-label">
            Name
          </label>
          <input
            className="form-control"
            id="inputName"
            aria-describedby="nameHelp"
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="inputSurname" className="form-label">
            Surname
          </label>
          <input
            className="form-control"
            id="inputSurname1"
            aria-describedby="surnameHelp"
            type="text"
            name="surname"
            value={user.surname}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="inputPhone" className="form-label">
            Phone
          </label>
          <input
            className="form-control"
            id="inputPhone"
            aria-describedby="phoneHelp"
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleChange}
          />
        </div>
        <div className="d-flex text-center justify-content-center editProfileDesign_btn">
          {!isLoading ? (
            <button type="submit" className="btn btn-primary p-2">
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