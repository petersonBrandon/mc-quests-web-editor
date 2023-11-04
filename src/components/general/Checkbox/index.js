"use client";

import React, { useEffect, useState } from "react";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";

const Checkbox = (props) => {
  const [checked, setChecked] = useState(false);
  const clickEvent = (e) => {
    e.preventDefault();
    setChecked(!checked);
    props.onClick(!checked);
  };

  useEffect(() => {
    if (props.defaultValue !== undefined) {
      setChecked(props.defaultValue);
    }
  }, [props.defaultValue]);

  return (
    <button onClick={clickEvent} className="flex space-x-3 items-center">
      {checked ? (
        <MdCheckBox color="#5D9943" className="scale-150" />
      ) : (
        <MdCheckBoxOutlineBlank color="#454955" className="scale-150" />
      )}
      <p>{props.title}</p>
    </button>
  );
};

export default Checkbox;
