import React from "react";
import { NavLink } from "react-router-dom";

import logo from "../img/logo_footer.svg"


class Footer extends React.Component {
  render(){
    return (
    <footer className="footer">
      <div className="footer__leftSide">
        <NavLink to="/">
            <img src={logo} alt="logo" className="footer__leftSide__logo" />
        </NavLink>
        <a href="https://www.1mf.ru/Политика%20конфиденциальности.pdf" download  className="footer__leftSide__a" target="_blank">Политика конфиденциальности</a>
      </div>
      <div className="footer__contacts">
        <a href="tel:+79040758645" className="footer__contacts__a">+7 (904) 075-86-45</a>
        <a href="mailto:ekesenina2306@gmail.com" className="footer__contacts__a">ekesenina2306@gmail.com</a>
      </div>
    </footer>
  )
  }
}

export default Footer;