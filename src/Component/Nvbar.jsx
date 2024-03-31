import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoggedIn = () => {
      const token = localStorage.getItem('userToken');
      if (token) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    };
    const intervalId = setInterval(checkLoggedIn, 500);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <FontAwesomeIcon icon={faStore} className="icon" />
          <NavLink className="navbar-brand" to="#">E-commerce</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
                    <NavLink className="nav-link"  to="/">Home</NavLink>
                  </li>
              {loggedIn && (
                <>
                   <li className="nav-item">
                    <NavLink className="nav-link" aria-current="page" to="/Profile">Profile</NavLink>
                  </li>
                
               
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/Categore">Categories</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/Cart">Cart</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/Orders">Orders</NavLink>
                  </li>
                
                </>
              )}
            </ul>
            <div className="d-flex">
              {loggedIn ? (
                <button className="btn btn-outline-dark">
                  <NavLink className="text-info" to="/Logout">Logout</NavLink>
                </button>
              ) : (
                <>

                  <button className="btn btn-outline-dark">
                    <NavLink className="text-info" to="/Login">Login</NavLink>
                  </button>
                  <button className="btn btn-outline-dark">
                    <NavLink className="text-info" to="/Signin">Signup</NavLink>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
