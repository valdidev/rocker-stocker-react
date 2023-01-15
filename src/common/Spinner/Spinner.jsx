import "../../index.css";

export const Spinner = () => {
  return (
    <span className="d-flex justify-content-center align-items-center">
      <span className="spinner-border text-white" role="status">
        <span className="visually-hidden">Loading...</span>
      </span>
    </span>
  );
};
