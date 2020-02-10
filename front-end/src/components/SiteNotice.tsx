// import * as React from "react";
import React from "react";

interface IProps {
  date?: string;
}

const SiteNotice: React.FC<IProps> = props => {
  return (
    <section className="container pt-4 text-center">
      <h1>Site Notice</h1>
      <h2>Site Owner</h2>
      <a href="https://github.com/sunyamare">github.com/sunyamare</a>
      <h2>Contact</h2>
      <a href="https://sunyamare.ch/contact">sunyamare.ch/contact</a>
      <h2>Data Privacy, Cookies, Disclaimer</h2>
      <p>
        We reserve all rights, we don't take any responsibilities for contents,
        we use all kinds of cookies, and we use your data!
      </p>
      <p>You have been warned. Please don't cry.</p>
      <p>
        <strong>Last changed: {props.date}</strong>
      </p>
    </section>
  );
};

SiteNotice.defaultProps = {
  date: "28.01.2020" // for test purposes just a string and not the more complex Date
};

export default SiteNotice;
