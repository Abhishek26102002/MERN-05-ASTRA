import React from "react";

const Pagination = ({
  totalItems,
  itemsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pages.push(i);
  }

  return (
    <>
      {pages?.map((page, idx) => (
        <div className="join" key={idx}>
          <input
            className={`join-item mx-1 btn btn-sm ${
              page === 1 ? "btn-active" : ""
            }`}
            type="radio"
            name="options"
            aria-label={page}
            onClick={() => {
              setCurrentPage(page);
            }}
          />
        </div>
      ))}
    </>
  );
};

export default Pagination;
