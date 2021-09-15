import React from "react";

function Pagination({ productPerPage, totalProducts, paginate }) {
  const pageNumbers = [];
  console.log(productPerPage, totalProducts, "====totalProducts");

  for (let i = 1; i <= Math.ceil(totalProducts / productPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <button onClick={() => paginate(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;
