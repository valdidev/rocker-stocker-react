import "../index.css";

export const ButtonSpinner = () => {
  return (
    <button
      className="btn btn-warning"
      type="button"
      disabled
      onClick={() => console.log("hola")}
    >
      <span
        className="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
      ></span>
      <span className="visually-hidden">Loading...</span>
    </button>
  );
};
