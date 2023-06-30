import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logOut } from "../store/Reducers/authorizationReducer";
import cycle from "../img/cycle.png"


const HomePage = (props) => {
  const { isAuthorized } = props;

  return (
    <div className="homePage">
                <div className="homePage__info">
                    <div className="homePage__info__image">
                        <img src={cycle} alt="img" className="homePage__info__image__cycle"/>
                    </div>
                    <div className="homePage__info__text1">
                        Иногда наши велосипеды подвергаются кражам, за что нам очень обидно
                    </div>
                    <div className="homePage__info__text2">
                        если вы располагаете информацией о <span className="homePage__info__text2__span">краже</span>  велосипеда, <span className="homePage__info__text2__span">сообщите</span> об этом в следующей форме
                    </div>
                </div>
                <div className="homePage__newCase"
                  type="button">
                  {isAuthorized ? (
                    <Link to="create_case" className={"homePage__newCase__button"}>
                      <button className={"homePage__newCase__button__report"}>
                        Сообщить о краже
                      </button>
                    </Link>
                  ) : (
                    <Link to="create_case_public" className={"homePage__newCase__button"}>
                      <button className={"homePage__newCase__button__report"}>
                        Сообщить о краже
                      </button>
                    </Link>
                  )}
                </div>
      </div>
  );
};
      
export default connect(
  (state) => {
    return {
      isAuthorized: state.authorizationReducer.isAuthorized,
    };
  },
  (dispatch) => {
    return {
      logOut: () => dispatch(logOut()),
    };
  }
)(HomePage);