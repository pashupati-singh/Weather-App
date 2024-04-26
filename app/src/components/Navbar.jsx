import React, { useState } from "react";
import style from '../Css/Navbar.module.css'
import image from "../Image/logo.png"

function Navbar({name,searchPressed,setSearch}) {
    const [active, setActive] = useState(false); // Changed initial state to false
    const [icon, setIcon] = useState(false);

    const navToggle = () => {
        setActive(!active); // Toggle active state
        setIcon(!icon); // Toggle icon state
      };

  return (
    <nav className={style.nav}>
      <div className={style.logo}>
        <img src={image} alt="err"  />
        <a href="#" className={style.nav__brand}>
      Weather Report
      </a>
      </div>
     
      <ul className={active ? `${style.nav__menu} ${style.nav__active}` : style.nav__menu}>
        <li className={style.nav__item}>
          <a href="#" className={style.nav__link}>
          {name}
          </a>
        </li>
        <li className={style.nav__item}>
          <a href="#" className={style.nav__link}>
            About
          </a>
        </li>
        <li className={style.nav__item}>
          <a href="#" className={style.nav__link}>
            Contact
          </a>
        </li>
      </ul>
     
    <div onClick={navToggle} className={icon ? `${style.nav__toggler} ${style.toggle}` : style.nav__toggler}>
    
     <div className={style.line}></div>
     <div className={style.line}></div>
     <div className={style.line}></div>
    </div>
    </nav>
  );
}

export default Navbar;

