import React from "react";
import SecondaryButton from "./SecondaryButton";
import error from "../../img/error.png"

const Message = (props) => {
  const { message, onClick } = props;
  return (
    <div className="message">
      <img src={error} alt="logo" className="case__card__success__img" />
      <h4 className="message__title">{message}</h4>
      <SecondaryButton
        title={"Назад"}
        type={"button"}
        onClick={onClick}
        className="message__button"
      />
    </div>
  );
};

export default Message;