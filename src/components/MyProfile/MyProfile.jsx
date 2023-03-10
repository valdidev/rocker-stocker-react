import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosGet } from "../../api/axios";
import { Spinner } from "../../common/Spinner/Spinner";
import { FaUserEdit } from "react-icons/fa";
import { AuthContext } from "../../contexts/AuthContext2";
import "./myProfile.css";

export const MyProfile = () => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    setIsLoading(true);
    axiosGet("user/profile", user?.id, user?.jwt)
      .then((result) => setProfile(result.data))
      .finally(setIsLoading(false));
  }, []);

  if (isLoading || !profile) return <Spinner />;

  return (
    <div className="myProfileDesign text-white container-fluid d-flex justify-content-center align-items-center">
      <div className="myProfileDesign_cardOut d-flex flex-column justify-content-evenly align-items-center  bg-black-rs border-dark-rs p-1 rounded">
        <h1 className="h-20 st-back-rs py-2">Profile</h1>
        <div className="myProfileDesign_cardIn d-flex row w-100 justify-content-between p-2 border-dark-rs rounded">
          <div className="d-flex col-12 col-sm-4 flex-column justify-content-center  bg-info">
            <div className="d-flex flex-column">
              <span className="fw-bold">NAME</span>
              {profile?.name}
            </div>
            <div className="d-flex flex-column">
              <span className="fw-bold">SURNAME</span>
              {profile?.surname || "Not provided"}
            </div>
            <div className="d-flex flex-column">
              <span className="fw-bold">PHONE</span>
              {profile?.phone || "Not provided"}
            </div>
          </div>
          <div className="d-flex justify-content-center col-12 col-sm-8 flex-column bg-black-dark-rs">
            <div className="d-flex flex-column">
              <span className="fw-bold">EMAIL</span>
              <span>{profile?.email}</span>
            </div>
            <div className="d-flex flex-column">
              <span className="fw-bold">POSITION</span>
              {profile?.rolId === 1 ? "Manager" : "Employee"}
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
              },
            }}
          >
            <div className="btn btn-info mt-2">
              <FaUserEdit size="1.5em" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
