import React from "react";
import NavBtn from "./NavBtn";

const NavBar = () => {
  return (
    <nav
      className={`flex w-screen justify-center items-center space-x-40 h-1/6`}
    >
      <NavBtn text="Quests" />
      <NavBtn text="Actions" />
      <NavBtn text="Conditions" />
    </nav>
  );
};

export default NavBar;
