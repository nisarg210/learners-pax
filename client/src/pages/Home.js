import React, { useEffect, useRef } from "react";

import "semantic-ui-css/semantic.min.css";
import "./Home.css";
import Lottie from "lottie-web";
import { motion } from "framer-motion";
import sample from "../static/home.mp4";

function Home() {
  const container = useRef(null);
  useEffect(() => {
    Lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../static/home.json"),
    });
  }, []);
  // animationData: require("../static/loginl.json"),
  const pageVariants = {
    initial: {
      opacity: 0,
      x: "-100vw",
      scale: 0.8,
    },
    in: {
      opacity: 1,
      x: 0,
      scale: 1,
    },
    out: {
      opacity: 0,
      x: "100vw",
      scale: 1.2,
    },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 1.5,
  };

  const pageStyle = {};
  return (
    <div className="home">
      <header class="showcase">
        <video muted loop autoPlay>
          <source src={sample} type="video/mp4" />
        </video>
        <div class="overlay"></div>
        <div class="text">
          <h2>
            <span>Never Stop To </span>
          </h2>
          <h3>
            <span>Exploring The World</span>
          </h3>
          <br />
          <a href="#">Explore</a>
        </div>
        <ul class="social">
          <li>
            <a href="#">
              <img src="https://i.ibb.co/x7P24fL/facebook.png" />
            </a>
          </li>
          <li>
            <a href="#">
              <img src="https://i.ibb.co/Wnxq2Nq/twitter.png" />
            </a>
          </li>
          <li>
            <a href="#">
              <img src="https://i.ibb.co/ySwtH4B/instagram.png" />
            </a>
          </li>
        </ul>
      </header>
      
      
     
    </div>
    // <motion.div
    //   style={pageStyle}
    //   initial="initial"
    //   animate="in"
    //   exit="out"
    //   variants={pageVariants}
    //   transition={pageTransition}
    // >
    //   <div className="hero-section">
    //     <div className="hero-1" ref={container}></div>
    //     <div className="hero-2">
    //       <p>
    //         ddddddddddddddddddddddhuhsdvdvsvs dsdvdsvsdv vdsvdvsdvs vdsvdvsv
    //         <br />
    //         dvsvsdvsvsvsdvddddddvdsvsdvsvd dvsvsdvsvsvsdvddddddvdsvsdvsvdsvd
    //         vsdvsdvsdv
    //         <br />
    //         ddddddddddddddddddddddhuhsdvdvsvs dsdvdsvsdv vdsvdvsdvs vdsvdvsv
    //         <br />
    //         dvsvsdvsvsvsdvddddddvdsvsdvsvd dvsvsdvsvsvsdvddddddvdsvsdvsvdsvd
    //         vsdvsdvsdv
    //         <br />
    //         ddddddddddddddddddddddhuhsdvdvsvs dsdvdsvsdv vdsvdvsdvs vdsvdvsv
    //         <br />
    //         dvsvsdvsvsvsdvddddddvdsvsdvsvd dvsvsdvsvsvsdvddddddvdsvsdvsvdsvd
    //         vsdvsdvsdv
    //         <br />
    //       </p>
    //     </div>
    //   </div>
    // </motion.div>
  );
}

export default Home;
