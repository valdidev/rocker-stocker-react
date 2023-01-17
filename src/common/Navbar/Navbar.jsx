import { useContext } from "react";
import { IoStatsChart } from "react-icons/io5";
import { HiUser } from "react-icons/hi";
import { MdAdminPanelSettings, MdOutlinePointOfSale } from "react-icons/md";
import { FaPowerOff } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import "../../index.css";
import "./navbar.css";
import { AuthContext } from "../../contexts/AuthContext2";

export const Navbar = () => {
  const { handlerAuth, user } = useContext(AuthContext);

  const confirmToSignOut = () => {
    Swal.fire({
      title: "Do you want to exit?",
      text: "Session information will be lost",
      icon: "question",
      iconColor: "#c1121f",
      showDenyButton: true,
      confirmButtonText: "SIGN OFF",
      confirmButtonColor: "#c1121f",
      denyButtonText: "No",
      denyButtonColor: "#edede9",
    }).then((result) => {
      if (result.isConfirmed) {
        handlerAuth();
      }
    });
  };

  return (
    <div className="navbarDesign text-white bg-black-dark-rs d-flex justify-content-around align-items-center">
      {user.rolId === 1 ? (
        <Link to="/private/admin">
          <div className="navbar_btn align-self-start py-1">
            <MdAdminPanelSettings size="3em" />
          </div>
        </Link>
      ) : null}

      <Link to="/private/mysales">
        <div className="navbar_btn align-self-start py-1">
          <IoStatsChart size="3em" />
        </div>
      </Link>
      <Link to="/private/home/cart">
        <div className="navbar_btn align-self-start py-1">
          <MdOutlinePointOfSale size="3em" />
        </div>
      </Link>
      <Link to="/private/myprofile">
        <div className="navbar_btn align-self-start py-1">
          <HiUser size="3em" />
        </div>
      </Link>
      <div
        onClick={() => confirmToSignOut()}
        className="navbar_btn align-self-center py-1"
      >
        <FaPowerOff color="red" size="3em" />
      </div>
    </div>
  );
};
