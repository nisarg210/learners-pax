import axios from "axios";
import { motion } from "framer-motion";
import Lottie from "lottie-web";
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import "./NewLogin.css";

function NewLogin() {
  const [name, setname] = useState("");
  const [branch, setBranch] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const history = useHistory();

  function setTeacher(teacher, tag = 1) {
    localStorage.setItem("TEACHER", JSON.stringify(teacher));
  }

  function getTeacher() {
    return JSON.parse(localStorage.getItem("TEACHER"));
  }

  const sendingLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/teacher/login", {
        emailID: email,
        password: password,
      });

      setpassword("");
      setemail("");
      setTeacher(res.data);
      history.push("/dashboard");
      console.log(getTeacher());
    } catch (err) {
      console.error(err);
    }
  };
  const sendingRegister = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/teacher/", {
        name: name,
        branch: branch,
        emailID: email,
        password: password,
      });
      history.push("/login");
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };
  const onRegister = (e) => {
    e.preventDefault();
    sendingRegister();
  };
  const onLogin = (e) => {
    e.preventDefault();
    sendingLogin();
  };

  const container = useRef(null);
  const container2 = useRef(null);
  useEffect(() => {
    Lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../static/loginl.json"),
    });
    Lottie.loadAnimation({
      container: container2.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../static/loginl2.json"),
    });
  }, []);

  const toggleForm = () => {
    const container = document.querySelector(".container");
    container.classList.toggle("active");
  };
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
    duration: 1,
  };

  const pageStyle = {};
  return (
    <motion.div
    // style={pageStyle}
    // initial="initial"
    // animate="in"
    // exit="out"
    // variants={pageVariants}
    // transition={pageTransition}
    >
      <section>
        <motion.div
          className="container"
          animate={{
            scale: [0, 1],
            // rotate: [270,360],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            // times: [0, 0.2, 0.5, 0.8, 1],

            //repeatDelay:2
          }}
        >
          <div className="user signinBx">
            <div className="imgBx" ref={container}>
              {/* <img
                src="https://raw.githubusercontent.com/WoojinFive/CSS_Playground/master/Responsive%20Login%20and%20Registration%20Form/img1.jpg"
                alt=""
              /> */}
            </div>
            <div className="formBx">
              {/* <div className="form"> */}
              <form action="#">
                <h2>Sign In</h2>
                <input
                  type="email"
                  value={email}
                  placeholder="Email"
                  id="email"
                  name="email"
                  onChange={(e) => {
                    setemail(e.target.value);
                  }}
                />
                <input
                  value={password}
                  type="password"
                  placeholder="Password"
                  name="password"
                  id="password"
                  onChange={(e) => {
                    setpassword(e.target.value);
                  }}
                />
                <input type="submit" name="" value="Login" onClick={onLogin} />
                <p className="signup">
                  Don't have an account ?
                  <a href="#" onClick={toggleForm}>
                    Sign Up.
                  </a>
                </p>
              </form>
            </div>
          </div>
          <div className="user signupBx">
            <div className="formBx">
              <form onsubmit={onRegister}>
                <h2>Create an account</h2>
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  id="name"
                  name="name"
                  onChange={(e) => {
                    setname(e.target.value);
                  }}
                />
                <input
                  type="email"
                  value={email}
                  placeholder="Email"
                  id="email"
                  name="email"
                  onChange={(e) => {
                    setemail(e.target.value);
                  }}
                />
                <input
                  value={password}
                  type="password"
                  placeholder="Password"
                  name="password"
                  id="password"
                  onChange={(e) => {
                    setpassword(e.target.value);
                  }}
                />
                <input
                  type="text"
                  placeholder="Branch"
                  value={branch}
                  id="branch"
                  name="branch"
                  onChange={(e) => {
                    setBranch(e.target.value);
                  }}
                />
                <input type="submit" name="" value="Sign Up" />
                <p className="signup">
                  Already have an account ?
                  <a href="#" onClick={toggleForm}>
                    Sign in.
                  </a>
                </p>
              </form>
            </div>

            <div className="imgBx" ref={container2}></div>
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
}

export default NewLogin;
