export const Pagination = ({ currentPage, maxPage, next, prev }) => {
  return (
    <div>
      <button disabled={currentPage === 1} onClick={prev}>
        PREV
      </button>
      <span>{currentPage}</span>
      <button disabled={currentPage === maxPage} onClick={next}>
        NEXT
      </button>
    </div>
  );
};
