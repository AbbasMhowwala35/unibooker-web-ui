import React from "react";
import { Spinner } from "react-bootstrap";

const Loader: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
        height: "100vh",
      }}
    >
      <Spinner animation="border" variant="primary" />
    </div>
  );
};

export default Loader;
