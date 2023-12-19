import React, { useState, useEffect } from "react";
//im porting useNAvigate and useLocation hooks
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/1024px-Eo_circle_orange_film-camera.svg.png";

const Header = () => {
  const [show, setShow] = useState("top");
  const [mobileMenu, setMobileMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  //whenever new page, start scrolling from the top
  useEffect(() => {
    window.scrollTo(0,0);
  }, [location])
  

  return (
    //writing a conditional class for mobile screens
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo">
          <img src={logo} alt="" className="logo-img" onClick={()=>navigate("/")}/>
        </div>
      </ContentWrapper>
    </header>
  );
};

export default Header;
