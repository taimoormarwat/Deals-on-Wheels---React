import React, { useState,useRef,useEffect } from "react";

import logo from "../logo.png";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

export default function Navbar(props) {
  const links = useSelector((state) => state.navbarReducer.dropDownLinks);
  const name = useSelector((state) => state.authReducer.name);
  const img = useSelector((state) => state.authReducer.img);

  const [darkMode,setDarkMode]=useState(localStorage.getItem('mode').length);
  const ref = useRef(true);

  const changeMode=()=>{
    setDarkMode(!darkMode);
    if(!darkMode){
      document.documentElement.setAttribute('data-bs-theme', 'dark');
      localStorage.setItem('mode','1');
    }
    else{
      document.documentElement.setAttribute('data-bs-theme', 'light');
      localStorage.setItem('mode','');

    }
  }

  useEffect(() => {
    const firstRender = ref.current;

    if (firstRender) {
      ref.current = false;
      if(darkMode){
        document.documentElement.setAttribute('data-bs-theme', 'dark');
        localStorage.setItem('mode','1');
      }  

    } 
  })

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Deals on Wheels" width="100" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/newad">
                Post an Ad
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item dropdown">
              <button
                className="btn btn-dark dropdown-toggle d-inline-flex align-items-center"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                id="account"
              >
                <img
                  src={(img==null || img.length<1)?logo:img}
                  alt=""
                  style={{
                    height: "25px",
                    width: "25px",
                    borderRadius: "50%",
                    border: "2px solid",
                    marginRight: "5px",
                    objectFit: "contain",
                  }}
                  id="accountImage"
                />
                <span id="accountName">{name==null?"Account":name}</span>
                <span className="ml-auto caret"></span>
              </button>

              <ul
                className="dropdown-menu dropdown-menu-dark"
                id="dropdownMenu"
              >
                {Object.keys(links).map((link, index) => (
                  <li key={index}>
                    <Link className="dropdown-item" to={links[link]}>
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
                {/* <button onClick={()=>{document.documentElement.setAttribute('data-bs-theme', 'dark')}}>Change mode</button> */}

            </li>
            
          </ul>
          <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" onChange={changeMode} checked={darkMode}/>
  <label className="form-check-label" style={{color:"white"}} htmlFor="flexSwitchCheckChecked">Dark Mode</label>
</div>

        </div>
      </div>
    </nav>
  );
}
