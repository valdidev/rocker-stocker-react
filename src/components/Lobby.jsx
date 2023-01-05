import { useState } from "react";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";

import './lobby.css';

export const Lobby = () => {
  const [flag, setFlag] = useState(true);

  return (
    <div className="container-fluid bg-black-rs vh-100 d-flex justify-content-center align-items-center">
      <div className="wrap-lobby d-flex col-10 col-md-6 col-l-4 col-xl-4  flex-column align-items-center justify-content-center">
        <div className="head-lobby text-white justify-self-start d-flex flex-column align-items-center mb-4">
          <h1 className="head-lobby-lettering text-center my-3">
            Rocker Stocker
          </h1>
          <div className="buttons-lobby d-flex justify-content-center">
            <div
              className="btn mx-2"
              onClick={() => setFlag(true)}
            >
              SIGN IN
            </div>
            <div
              className="btn mx-2"
              onClick={() => setFlag(false)}
            >
              SIGN UP
            </div>
          </div>
        </div>
        <div className="body-lobby mt-3 d-flex flex-column text-white">
          {flag ? <SignIn /> : <SignUp />}
        </div>
      </div>
    </div>
  );
};
