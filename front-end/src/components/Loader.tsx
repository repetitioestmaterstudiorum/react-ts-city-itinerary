import React, { FC, Fragment } from "react";

const Loader: FC = () => {
  return (
    <Fragment>
      <div className="pt-2">
        <p style={{ fontSize: "1.2rem" }}>Loading...</p>
      </div>
      <div className="d-flex justify-content-center">
        <div
          style={{ width: "3rem", height: "3rem" }}
          className="spinner-border text-primary pt-3"
          role="status"
          aria-hidden="true"></div>
      </div>
    </Fragment>
  );
};

export default Loader;
