import React from "react";
import loader from "../../img/loader.png"


const Loading = () => {
  return <div role="status">
    <img src={loader} alt="img" className="loader"/>
  </div>;
};

export default Loading;