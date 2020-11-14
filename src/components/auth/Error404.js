import React from "react";

const Error404 = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1>ERROR 404.</h1>
        <p>This page does not exist.</p>
      </div>
    </div>
  );
};

export default Error404;
