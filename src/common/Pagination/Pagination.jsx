import "./pagination.css";

export const Pagination = ({ currentPage, maxPage, next, prev }) => {
  return (
    <div className="paginationDesign d-flex justify-content-center align-items-center pb-1">
      <button
        className="paginationDesign_btn"
        disabled={currentPage === 1}
        onClick={prev}
      >
        &laquo;
      </button>
      <span className="paginationDesign_page">{currentPage}</span>
      <button
        className="paginationDesign_btn"
        disabled={currentPage === maxPage}
        onClick={next}
      >
        &raquo;
      </button>
    </div>
  );
};
