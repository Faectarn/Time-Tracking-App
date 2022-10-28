import React from "react";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <NavLink
        to={"/TimeTracker"}
      >
        <img src="https://cdn-icons-png.flaticon.com/512/3867/3867499.png" width={40} />
      </NavLink>
      <NavLink
        to={"/Overview"}
      >
        <img src="https://cdn-icons-png.flaticon.com/512/1665/1665652.png" width={40} />
      </NavLink>
      <NavLink
        to={"/Calendar"}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/55/55281.png" width={40} />
      </NavLink>
    </footer>
  );
}

export default Footer;