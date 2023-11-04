import React from "react";

const Button = (props) => {
  const action = (e) => {
    e.preventDefault();
    props.action();
  };
  return (
    <button
      onClick={action}
      className="bg-bamboo_green text-white p-2 w-full rounded-xl hover:scale-105 ease-in-out duration-300"
    >
      {props.text}
    </button>
  );
};

export default Button;
