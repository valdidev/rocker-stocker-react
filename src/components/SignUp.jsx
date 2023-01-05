import React from "react";

export const SignUp = () => {
  const onSubmit = () => null;

  return (
    <div className="form container form-container d-flex flex-column align-items-center">
      <form
        onSubmit={onSubmit}
        className="d-flex flex-column align-items-center justify-content-center"
      >
        <h1 className="text-center">Sign up</h1>
        <input className="form-control my-2" type="email" placeholder="Email" />
        <input
          className="form-control my-2"
          type="password"
          placeholder="Password"
        />
        <input
          className="form-control my-2"
          type="password"
          placeholder="Confirm password"
        />
        <button className="btn bg-orange-rs w-100 my-4">Send</button>
      </form>
    </div>
  );
};