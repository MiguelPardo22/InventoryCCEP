import React from "react";
import { NavLink } from "react-router-dom";

function Index() {
  return (
    <>
      <div>index</div>
      <NavLink to="/dashboard">Admin</NavLink>
    </>
  );
}

export { Index };