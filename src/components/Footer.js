import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p className="alignment">Copyright ⓒVenkatesh Dharmavarapu {year}</p>
    </footer>
  );
}

export default Footer;