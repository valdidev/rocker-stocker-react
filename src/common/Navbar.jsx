// import { useContext } from 'react';
// import AuthContext from '../contexts/AuthContext';
import { IoStatsChart } from "react-icons/io5";
import { HiUser } from "react-icons/hi";
import { MdShoppingCart } from "react-icons/md";
import "../index.css";

export const Navbar = () => {
  // const { handlerAuth } = useContext(AuthContext)

  return (
    <div className="navbarDesign text-white bg-black-dark-rs d-flex justify-content-around align-items-center">
      <div className="navbar_btn pb-3">
        <IoStatsChart size="3em" />
      </div>
      <div className="navbar_btn d-flex flex-column align-items-center justify-content-center">
        <p className="navbar_btn_role mb-0">Emplooyer</p>
        <HiUser size="2em" />
        <p className="navbar_btn_user mb-1">Manolo</p>
      </div>
      <div className="navbar_btn pb-3">
        <MdShoppingCart size="3em" />
      </div>
    </div>
  );
};
