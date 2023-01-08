import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import { IoStatsChart } from "react-icons/io5";
import { HiUser } from "react-icons/hi";
import { MdShoppingCart } from "react-icons/md";
import { FaPowerOff } from "react-icons/fa";
import { Link } from "react-router-dom";

import "../../index.css";
import "./navbar.css";

export const Navbar = () => {
  const { handlerAuth } = useContext(AuthContext);

  return (
    <div className="navbarDesign text-white bg-black-dark-rs d-flex justify-content-around align-items-center">
      <Link to="/private/mysales">
        <div className="navbar_btn pb-3">
          <IoStatsChart size="3em" />
        </div>
      </Link>
      <Link to="/private">
        <div className="navbar_btn pb-3">
          <MdShoppingCart size="3em" />
        </div>
      </Link>
      <Link to="/private/myprofile">
        <div className="navbar_btn pb-3">
          <HiUser size="3em" />
        </div>
      </Link>
      <div onClick={() => handlerAuth()} className="navbar_btn pb-3">
        <FaPowerOff color="red" size="3em" />
      </div>
    </div>
  );
};
