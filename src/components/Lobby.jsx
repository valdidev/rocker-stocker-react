import { useState } from "react";

export const Lobby = () => {
  const [flag, setFlag] = useState(true);

  return (
    <div className="container-fluid bg-black-rs">
      <div className="container-lobby d-flex align-items-center justify-content-center row">
        <div className="wrap-lobby d-flex col-10 col-md-6 col-l-4 col-xl-4  flex-column align-items-center border-black-rs bs-white-rs justify-content-center">
          <div className="head-lobby text-white justify-self-start d-flex flex-column align-items-center mb-4">
            <img
              src={logo}
              width={100}
              className="d-inline-block align-top mt-5"
              alt="Overland NInja Logo"
            />
            <h1 className="rs-lettering text-center my-3 st-back-rs">
              Rocker Stocker
            </h1>
            <div className="buttons-lobby d-flex justify-content-center">
              <div
                className="btn mx-2 bg-orange-rs"
                onClick={() => setFlag(true)}
              >
                SIGN IN
              </div>
              <div
                className="btn mx-2 bg-orange-rs"
                onClick={() => setFlag(false)}
              >
                SIGN UP
              </div>
            </div>
          </div>
          <div className="body-lobby mt-3 d-flex flex-column text-white">
            {flag ? <Signin /> : <Signup />}
          </div>
        </div>
      </div>
    </div>
  );
};