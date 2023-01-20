export const ButtonWithLoader = ({ isLoading, IconButton }) => {
  return (
    <>
      {isLoading ? (
        <button className="btn btn-success w-50" type="button">
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Send</span>
        </button>
      ) : (
        <button className="btn btn-success w-50" type="submit">
          {IconButton}
        </button>
      )}
    </>
  );
};
