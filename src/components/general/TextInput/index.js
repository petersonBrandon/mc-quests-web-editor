import React, { useEffect } from "react";

const TextInput = (props) => {
  const [filled, setFilled] = React.useState(false);

  useEffect(() => {
    if (props.filled !== undefined) {
      setFilled(props.filled);
    } else {
      setFilled(false);
    }
  }, []);
  return (
    <div className="w-full flex flex-col group relative justify-center items-center">
      <span
        className={`absolute w-full h-full rounded-xl ring-2 ring-inset ring-bamboo_gray duration-300`}
      />
      <p
        className={`px-2 left-0 absolute z-10 rounded-xl ${
          filled
            ? "-translate-y-5 translate-x-3 text-sm bg-white opacity-100 text-gray-400"
            : "opacity-50"
        } group-focus-within:-translate-y-5 group-focus-within:translate-x-3 group-focus-within:rounded-none group-focus-within:bg-white
     group-focus-within:text-PHW_Red group-focus-within:text-sm group-focus-within:opacity-100 ease-in-out duration-300`}
      >
        {props.placeholder}
      </p>
      <input
        type="text"
        defaultValue={props.value !== undefined ? props.value : ""}
        onInput={(e) => {
          if (e.target.value.trim().length === 0) {
            setFilled(false);
          } else {
            setFilled(true);
          }
          props.onTextChange(e.target.value);
        }}
        className="focus:outline-none bg-transparent z-20 p-2 rounded-xl w-full h-full"
      />
    </div>
  );
};

export default TextInput;
