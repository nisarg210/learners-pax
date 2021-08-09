import React, { useEffect, useRef } from "react";

import "semantic-ui-css/semantic.min.css";
import "./Home.css";
import Lottie from "lottie-web";
import { motion } from "framer-motion";


function Home() {
  const container = useRef(null);
  useEffect(() => {
    Lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../static/loginl.json"),
    });
  }, []);

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
    <motion.div
      style={pageStyle}
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <div className="hero-section">
        <div className="hero-1" ref={container}></div>
        <div className="hero-2">
          <p>
            ddddddddddddddddddddddhuhsdvdvsvs dsdvdsvsdv vdsvdvsdvs vdsvdvsv
            <br />
            dvsvsdvsvsvsdvddddddvdsvsdvsvd dvsvsdvsvsvsdvddddddvdsvsdvsvdsvd
            vsdvsdvsdv
            <br />
            ddddddddddddddddddddddhuhsdvdvsvs dsdvdsvsdv vdsvdvsdvs vdsvdvsv
            <br />
            dvsvsdvsvsvsdvddddddvdsvsdvsvd dvsvsdvsvsvsdvddddddvdsvsdvsvdsvd
            vsdvsdvsdv
            <br />
            ddddddddddddddddddddddhuhsdvdvsvs dsdvdsvsdv vdsvdvsdvs vdsvdvsv
            <br />
            dvsvsdvsvsvsdvddddddvdsvsdvsvd dvsvsdvsvsvsdvddddddvdsvsdvsvdsvd
            vsdvsdvsdv
            <br />
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default Home;
