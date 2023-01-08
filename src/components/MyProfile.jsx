import {  useEffect, useState } from "react";
import { axiosGet } from "../api/axios";
import "../index.css";

export const MyProfile = () => {
  const [profile, setProfile] = useState(null);

  const userLogged = JSON.parse(localStorage.getItem("RS_USER"));

  const userJwt = userLogged.jwt;

  useEffect(() => {
    axiosGet("user/profile", userLogged.id, userJwt);
  }, []);

  return <div className="contentDesign">
    <h1>my profile</h1>
  </div>;
};
