import React from "react";

const MainButton = (props) => {
  const { title, type, className, disabled, onClick } = props;
  return (
    <button
      className={className}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default MainButton;