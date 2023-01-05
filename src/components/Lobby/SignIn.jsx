import "./signin-signup.css";

export const SignIn = () => {
  const onSubmit = () => null;

  return (
    <div className="form container">
      <form
        onSubmit={onSubmit}
        className="d-flex flex-column align-items-center justify-content-center"
      >
        <h1 className="text-center">Sign in</h1>
        <input className="form-control my-2" type="email" placeholder="Email" />
        <input
          className="form-control my-2"
          type="password"
          placeholder="Password"
        />
        <p className="text-danger">Email or Password incorrect</p>
        <button className="btn-send btn btn-success btn-shadow w-100 my-4">
          Send
        </button>
      </form>
    </div>
  );
};
