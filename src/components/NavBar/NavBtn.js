import React from "react";

const NavBtn = (props) => {
  return (
    <div className="text-2xl text-bamboo_green hover:scale-105 hover:cursor-pointer ease-in-out duration-300">
      {props.text}
    </div>
  );
};

export default NavBtn;
