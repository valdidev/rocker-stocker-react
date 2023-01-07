import { useState } from "react";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";

import './lobby.css'

export const Lobby = () => {
  const [flag, setFlag] = useState(true);

  return (
    <div className="container-fluid bg-black-rs">
      <div className="container-lobby d-flex align-items-center justify-content-center row">
        <div className="wrap-lobby d-flex col-10 col-md-6 col-l-4 col-xl-4  flex-column align-items-center border-black-rs bs-white-rs justify-content-center">
          <div className="head-lobby text-white justify-self-start d-flex flex-column align-items-center mb-4">
            <h1 className="rs-lettering head-lobby-lettering text-center my-3 st-back-rs">
              Rocker Stocker
            </h1>
            <div className="btn d-flex justify-content-center">
              <div
                className="buttons-lobby btn btn-orange mx-2"
                onClick={() => setFlag(true)}
              >
                SIGN IN
              </div>
              <div
                className="buttons-lobby btn btn-orange mx-2"
                onClick={() => setFlag(false)}
              >
                SIGN UP
              </div>
            </div>
          </div>
          <div className="body-lobby mt-3 d-flex flex-column align-items-center justify-content-start text-white">
            {flag ? <SignIn /> : <SignUp />}
          </div>
        </div>
      </div>
    </div>
  );
};
