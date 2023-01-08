import "../index.css";

export const Spinner = () => {
  return (
    <div className="contentDesign d-flex justify-content-center align-items-center">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};
