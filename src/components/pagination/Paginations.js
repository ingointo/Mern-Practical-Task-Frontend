import React from "react";
import Pagination from "react-bootstrap/Pagination";
import "./Pagination.css";
const Paginations = ({
  handlePrevious,
  handleNext,
  page,
  pageCount,
  setPage,
}) => {
  return (
    <div>
      {pageCount > 0 ? (
        <div className="pagination-div d-flex justify-content-end mx-5">
          <Pagination>
            <Pagination.Prev onClick={() => handlePrevious()} />
            {Array(pageCount)
              .fill(null)
              .map((element, index) => {
                return (
                  <>
                    <Pagination.Item
                      active={page === index + 1 ? true : false}
                      onClick={() => setPage(index + 1)}
                    >
                      {index + 1}
                    </Pagination.Item>
                  </>
                );
              })}

            <Pagination.Next onClick={() => handleNext()} />
          </Pagination>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Paginations;
