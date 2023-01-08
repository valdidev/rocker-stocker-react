import {  useEffect, useState } from "react";
import { axiosGet } from "../api/axios";

export const MySales = () => {
  const [sales, setSales] = useState(null);

  const userLogged = JSON.parse(localStorage.getItem("RS_USER"));

  const userJwt = userLogged.jwt;

  useEffect(() => {
    axiosGet("sale/mysales", userLogged.id, userJwt);
  }, []);

  return (
    <div className="contentDesign">
      <h1>SALES</h1>
    </div>
  );
};
