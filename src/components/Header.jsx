import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { logOut } from "../store/Reducers/authorizationReducer";
import { connect } from "react-redux";
import logo from "../img/logo.svg"


const Header = (props) => {

    const { 
      logOut, 
      isAuthorized 
    } = props;

    const navigate = useNavigate();

    const handleClickButtonLogOut = () => {
      logOut();
      navigate("/");
    };

    const handleClickButtonLogIn = () => {
      navigate("/auth/sign_in");
    };

  const [isNavOpen, setIsNavOpen] = useState(false);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };


  return (
    <header className="header">
      <NavLink to="/">
          <img src={logo} alt="logo" 
          className="header__logo" />
      </NavLink> 
      {windowWidth <= 768 && (
        <button className="header__navToggle" type="button" onClick={toggleNav}></button>
      )}
       {(windowWidth > 768 || isNavOpen) && (
      <nav className="header__nav">
        {isAuthorized && (
          <>
            <NavLink 
                className={`header__nav__link ${({ isActive }) =>(isActive ? "active" : "")}`} to="cases">
                Все сообщения о кражаж
            </NavLink>
            <NavLink 
                className={`header__nav__link ${({ isActive }) =>(isActive ? "active" : "")}`} to="officers">
                Ответственные сотрудники
            </NavLink>
          </>
        )}
        <button
            className="header__nav__button__signIn"
            type="button"
            onClick={
            isAuthorized
                ? handleClickButtonLogOut
                : handleClickButtonLogIn
            }
        >
            {isAuthorized ? "Выйти" : "Войти"}
        </button>
      </nav>
      )}
    </header>
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
  )(Header);
