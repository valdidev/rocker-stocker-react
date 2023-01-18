import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosPatch } from "../../api/axios";
import { ButtonSpinner } from "../../common/ButtonSpinner/ButtonSpinner";
import { MdDone } from "react-icons/md";
import { AuthContext } from "../../contexts/AuthContext2";
import "./editProfile.css";

export const EditProfile = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [userProfile, setUser] = useState(state.editableProfile || null);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useContext(AuthContext);

  const handleChange = (e) => {
    setUser({
      ...userProfile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    setIsLoading(true);

    e.preventDefault();
    let bodyToUpdateProfile = {
      name: userProfile.name,
      surname: userProfile.surname,
      phone: userProfile.phone,
      email: userProfile.email,
    };

    axiosPatch("user/modify", "", bodyToUpdateProfile, user?.jwt)
      .then((data) => console.log(data))
      .catch((error) => console.log(error))
      .finally(() => navigate(-1));
  };

  return (
    <div className="editProfileDesign container">
      <h3 className="text-center text-black py-3">
        Edit profile of {userProfile.email}
      </h3>
      <form
        className="editProfileDesign_form container"
        onSubmit={handleSubmit}
      >
        <div className="mb-3">
          <label htmlFor="inputName" className="form-label fw-bold">
            Name
          </label>
          <input
            className="form-control"
            id="inputName"
            aria-describedby="nameHelp"
            type="text"
            name="name"
            value={userProfile.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="inputSurname" className="form-label fw-bold">
            Surname
          </label>
          <input
            className="form-control"
            id="inputSurname1"
            aria-describedby="surnameHelp"
            type="text"
            name="surname"
            value={userProfile.surname}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="inputPhone" className="form-label fw-bold">
            Phone
          </label>
          <input
            className="form-control"
            id="inputPhone"
            aria-describedby="phoneHelp"
            type="text"
            name="phone"
            value={userProfile.phone}
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
