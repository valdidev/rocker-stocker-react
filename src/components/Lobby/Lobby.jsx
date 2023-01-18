import { useState } from "react";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";
import { GrUserAdd, GrUserAdmin } from "react-icons/gr";
import "./lobby.css";
import "../../index.css";

export const Lobby = () => {
  const [flag, setFlag] = useState(true);

  const switchFlag = () => {
    setFlag(!flag);
  };

  return (
    <div className="container-fluid lobbyContainer">
      <div className="lobbyContainer_wrap d-flex align-items-center justify-content-center row">
        <div className="lobbyContainer_items d-flex col-10 col-md-6 col-l-4 col-xl-4  flex-column align-items-center border-black-rs bs-white-rs justify-content-center rounded bg-black-rs">
          <div className="lobbyContainer_items_head text-white d-flex flex-column align-items-center justify-content-evenly">
            <h1 className="lobbyContainer_items_head_rs text-center">
              Rocker Stocker
            </h1>
            <div className="d-flex justify-content-center">
              <div
                className={`btn btn-warning py-2 px-3 mx-2 fw-bolder ${!flag && 'btnSelected'}`}
                onClick={() => setFlag(true)}
              >
                <GrUserAdmin size="2em" />
              </div>
              <div
                className={`btn btn-warning py-2 px-3 mx-2 fw-bolder ${flag && 'btnSelected'}`}
                onClick={() => setFlag(false)}
              >
                <GrUserAdd size="2em" />
              </div>
            </div>
          </div>
          <div className="lobbyContainer_items_body text-white">
            {flag ? <SignIn /> : <SignUp switchFlag={switchFlag} />}
          </div>
        </div>
      </div>
    </div>
  );
};
