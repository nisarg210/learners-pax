import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./NewNav.css";
import "semantic-ui-css/semantic.min.css";
import { FaBars } from "react-icons/fa";

function NewNav(props) {
  const {auth,handle}=props;
  const [click, setClick] = React.useState(false);

  const handleClick = () => setClick(!click);
  const Close = () => setClick(false);
  const [loginStatus, setloginStatus] = useState();

  useEffect(() => {
    console.log(auth);
   setloginStatus(auth)
  }, [auth]);

  return (
    <div>
      <div className={click ? "main-container" : ""} onClick={() => Close()} />
      <nav className="navbar" onClick={(e) => e.stopPropagation()}>
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            Learner's Pax
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/about"
                activeClassName="active"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/dashboard"
                activeClassName="active"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/contact"
                activeClassName="active"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                Contact Us
              </NavLink>
            </li>

            <li className="nav-item">
              {!loginStatus ? (
                <NavLink
                  exact
                  to="/login"
                  activeClassName="active"
                  className="nav-links"
                  onClick={click ? handleClick : null}
                >
                  Teacher Login
                </NavLink>
              ) : (
                <NavLink
                  exact
                  to="/login"
                  activeClassName="active"
                  className="nav-links"
                  onClick={() => {
                    localStorage.clear();
                    handle(false);
                  }}
                >
                  Logout
                </NavLink>
              )}
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <FaBars />
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NewNav;
