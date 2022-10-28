import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer";

function Root() {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}

export default Root;