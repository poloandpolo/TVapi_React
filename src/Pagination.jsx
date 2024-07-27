import React from 'react';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const pageNumbers = [];
  const maxPageNumbers = 10;

  const startPage = Math.max(0, Math.min(currentPage - Math.floor(maxPageNumbers / 2), totalPages - maxPageNumbers));
  const endPage = Math.min(totalPages, startPage + maxPageNumbers);

  for (let i = startPage; i < endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <button onClick={() => onPageChange(0)} disabled={currentPage === 0}>
        First
      </button>
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 0}>
        Previous
      </button>
      {pageNumbers.map(number => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={currentPage === number ? 'active' : ''}
        >
          {number + 1}
        </button>
      ))}
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages - 1}>
        Next
      </button>
      <button onClick={() => onPageChange(totalPages - 1)} disabled={currentPage === totalPages - 1}>
        Last
      </button>
    </div>
  );
};

export default Pagination;
