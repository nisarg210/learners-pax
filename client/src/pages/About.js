import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import "./About.css";
function About() {
  return (
    <div>
      <div className="about-section">
        <div className="about-container">
          <div className="about-content-section">
            <div className="about-title">
              <h1>About Us</h1>
            </div>
            <div className="about-content">
              <h3>Lorem ipsum dolor sit amet, consectetur adipisicing</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <div className="about-button">
                <a href="">Read More</a>
              </div>
            </div>
            <div className="about-social">
              <div className="icc">
                <FaFacebookF size="40px" spacing="100" />
                {"   "}
                <FaTwitter size="40px" />
                <FaInstagram size="40px" />
              </div>

              <a href="">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
          <div className="about-image-section">
            <img src="https://i.pinimg.com/736x/89/90/48/899048ab0cc455154006fdb9676964b3.jpg"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
