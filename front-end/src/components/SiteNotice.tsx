// import * as React from "react";
import React from "react";

const SiteNotice: React.FC = props => {
  return (
    <section className="container text-center">
      <h1>Site Notice</h1>
      <h2>Site Owner</h2>
      <a
        href="https://github.com/sunyamare"
        target="_blank"
        rel="noopener noreferrer"
      >
        github.com/sunyamare
      </a>
      <h2>Contact</h2>
      <a
        href="https://sunyamare.ch/contact"
        target="_blank"
        rel="noopener noreferrer"
      >
        sunyamare.ch/contact
      </a>
      <h2>Data Privacy, Cookies, Disclaimer</h2>
      <p>
        We reserve all rights, we don't take any responsibilities for contents,
        we use all kinds of cookies, and we use your data!
      </p>
      <p>You have been warned. Please don't cry.</p>
      <p>
        <strong>Last changed: 28.01.2020</strong>
      </p>
    </section>
  );
};

export default SiteNotice;
