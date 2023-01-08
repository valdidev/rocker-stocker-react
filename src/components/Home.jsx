import { Link } from "react-router-dom";
import "../index.css";

export const Home = () => {
  return (
    <div className="contentDesign">
      <Link to="/private/admin/allusers">
        <div>ADMIN</div>
      </Link>
    </div>
  );
};
