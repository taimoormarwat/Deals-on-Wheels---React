import React from 'react'

import logo from '../logo.png';
import { Link } from 'react-router-dom';

export default function Navbar(props) {
  return (
<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container">
    <Link className="navbar-brand" to="/"><img src={logo} alt="Deals on Wheels" width="100"/></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/newad">Post an Ad</Link>
        </li>
      </ul>
      <ul className="navbar-nav ms-auto">
        <li className="nav-item dropdown">
          <button className="btn btn-dark dropdown-toggle d-inline-flex align-items-center" data-bs-toggle="dropdown" aria-expanded="false" id="account">
            <img src={logo} alt="" style={{height:"25px", width:"25px",borderRadius:"50%",border:"2px solid", marginRight:"5px",objectFit:"contain"}} id="accountImage"/>
            <span id="accountName">Account</span>
            <span className="ml-auto caret"></span>
          </button>

          <ul className="dropdown-menu dropdown-menu-dark" id="dropdownMenu">
            <li><Link className="dropdown-item" to="/login">Login</Link></li>
            <li><Link className="dropdown-item" to="/signup">Sign Up</Link></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>

  )
}
