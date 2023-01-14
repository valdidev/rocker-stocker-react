import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosGet } from "../api/axios";
import { Spinner } from "../common/Spinner";
import "../index.css";

export const MyProfile = () => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const userLogged = JSON.parse(localStorage.getItem("RS_USER"));

  useEffect(() => {
    setIsLoading(true);
    axiosGet("user/profile", userLogged.id)
      .then((result) => setProfile(result.data))
      .finally(setIsLoading(false));
  }, []);

  if (!profile) return <Spinner />;

  return (
    <div className="contentDesign text-white container d-flex justify-content-center align-items-center w-100">
      <div className=" w-100 d-flex flex-column justify-content-center align-items-center  bg-black-rs border-dark-rs p-1 rounded">
        <h2 className="h-20 st-back-rs">Profile</h2>
        <div className="d-flex row w-100 justify-content-between p-2 border-dark-rs m-2">
          <div className="d-flex col-12 col-sm-4 flex-column  bg-info">
            <div className="d-flex flex-column">
              <span className="fw-bold">NAME</span>
              {profile.name}
            </div>
            <div className="d-flex flex-column">
              <span className="fw-bold">SURNAME</span>
              {profile.surname}
            </div>
            <div className="d-flex flex-column">
              <span className="fw-bold">PHONE</span>
              {profile.phone}
            </div>
          </div>
          <div className="d-flex justify-content-center col-12 col-sm-8 flex-column bg-black-dark-rs">
            <div className="d-flex flex-column">
              <span className="fw-bold">EMAIL</span>
              <span>{profile.email}</span>
            </div>
            <div className="d-flex flex-column">
              <span className="fw-bold">POSITION</span>
              {profile.rolId === 1 ? "Manager" : "Employee"}
            </div>
          </div>
        </div>
        <div>
          <Link
            to="/private/myprofile/edit"
            state={{
              editableProfile: {
                name: profile.name,
                surname: profile.surname,
                phone: profile.phone,
                email: profile.email
              },
            }}
          >
            <div className="btn btn-info">EDIT</div>
          </Link>
        </div>
      </div>
    </div>
  );
};
