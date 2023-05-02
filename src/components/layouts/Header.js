import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
   return (
      <Fragment>
         <header className="flex items-center justify-center text-white gap-x-5 py-10">
            <NavLink
               to="/"
               className={({ isActive }) => (isActive ? "text-primary" : "")}
               style={{
                  transition: "all 0.1s",
               }}
            >
               Home
            </NavLink>
            <NavLink
               to="/movies"
               className={({ isActive }) => (isActive ? "text-primary" : "")}
               style={{
                  transition: "all 0.1s",
               }}
            >
               Movie
            </NavLink>
         </header>
      </Fragment>
   );
};

export default Header;
