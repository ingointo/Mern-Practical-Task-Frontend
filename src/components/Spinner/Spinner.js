import React from "react";
import Spin from "react-bootstrap/Spinner";

const Spinner = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ width: "100%", height: "50vh" }}
    >
      <Spin animation="border" variant="danger" />
      &nbsp; Loading....
    </div>
  );
};

export default Spinner;
