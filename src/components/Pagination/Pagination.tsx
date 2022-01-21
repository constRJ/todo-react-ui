import React from "react";

interface PaginationProps {
  todosLength: number;
  currentPage: number;
  itemPerPage: number;
  changePage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  todosLength,
  currentPage,
  itemPerPage,
  changePage,
}) => {
  const pages = Math.ceil(todosLength / itemPerPage);
  const pagesNumber = [];

  for (let i = 1; i <= pages; i++) {
    pagesNumber.push(i);
  }

  return (
    <React.Fragment>
      <ul className="pagination">
        {pagesNumber.map((pageNumber, index) => {
          return (
            <li
              onClick={() => changePage(pageNumber)}
              key={index}
              className={
                pageNumber === currentPage
                  ? "pagination__item active"
                  : "pagination__item"
              }
            >
              {pageNumber}
            </li>
          );
        })}
      </ul>
    </React.Fragment>
  );
};

export default Pagination;
