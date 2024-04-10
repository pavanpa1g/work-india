
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

import "./index.css"

const Pagination = ({ totalPages, onPageChange, currentPage }) => {
  const handlePageChange = (page) => {
    onPageChange(page);
  };

  return (
    <div className="pagination-bg-container">
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
        className="prev-next-buttons"
      >
        Previous
      </button>
      <button
        disabled={currentPage === 1}
        className="prev-next-icon-buttons"
        onClick={() => handlePageChange(currentPage - 1)}
      >
        <AiFillCaretLeft color="#000" size={20} />
      </button>
      {[...Array(totalPages).keys()].map((page) => {
        if (
          page === 0 ||
          page === totalPages - 1 ||
          Math.abs(page - currentPage) <= 1 ||
          (currentPage <= 3 && page <= 3) ||
          (currentPage >= totalPages - 4 && page >= totalPages - 4)
        ) {
          return (
            <button
              key={page}
              onClick={() => handlePageChange(page + 1)}
              disabled={page + 1 === currentPage}
              className="button"
            >
              {page + 1}
            </button>
          );
        } else if (
          (currentPage <= 3 && page === 4) ||
          (currentPage >= totalPages - 4 && page === totalPages - 5)
        ) {
          return <span key={page}>...</span>;
        }
        return null;
      })}

      <button
        disabled={currentPage === totalPages}
        className="prev-next-icon-buttons"
        onClick={() => handlePageChange(currentPage + 1)}
      >
        <AiFillCaretRight color="#000" size={20} />
      </button>

      <button
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
        className="prev-next-buttons"
      >
        Next
      </button>
    </div>
  );
};


export default Pagination;