// import * as React from "react";
import React from "react";

interface IProps {
  date?: string;
}

const SiteNotice: React.FC<IProps> = props => {
  return (
    <React.Fragment>
      <h2>Site Notice</h2>
      <h3>Site Owner</h3>
      <p>github.com/sunyamare</p>
      <h3>Contact</h3>
      <p>sunyamare.ch/contact</p>
      <h3>Data Privacy, Cookies, Disclaimer</h3>
      <p>
        We reserve all rights, we don't take any responsibilities for contents
        and their correctness and how this might affect anyone, we use cookies,
        we use your data however we want in the confines of the laws applicable
        to us.
      </p>
      <p>You have been warned. Please don't cry.</p>
      <p>
        <strong>Last changed: {props.date}</strong>
      </p>
    </React.Fragment>
  );
};

SiteNotice.defaultProps = {
  date: "28.01.2020" // for test purposes just a string and not the more complex Date
};

export default SiteNotice;
