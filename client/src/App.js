import React, { useRef, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import NewLogin from "./pages/NewLogin";
import NewNav from "./pages/NewNav";
import Announcement from "./pages/Announcement";
import { AnimatePresence, motion } from "framer-motion";
import Dashboard from "./pages/Dashboard";
import Note from "./pages/Note";
import Books from "./pages/Books";
import Paper from "./pages/Paper";
import { Provider } from "./state";

function App() {
  // let location = useLocation();
const store =useRef({});
  const TEACHER = "TEACHER";
  function setTeacher(teacher) {
    localStorage.setItem(TEACHER, JSON.stringify(teacher));
  }

  function getTeacher() {
    return JSON.parse(localStorage.getItem(TEACHER));
  }
  function isAuthenticated() {
    if (getTeacher()) {
      return true;
    } else return false;
  }

  function logout() {
    localStorage.removeItem(TEACHER);
  }

  const [login, setLogin] = useState(false)
  const handleauth=(status)=>{
    setLogin(status);
    console.log(login);
  }
  return (
    <>
      <Provider
        value={{
          store,
          setTeacher,
          getTeacher,
          isAuthenticated,
          logout,
        }}
      >
        <Router>
          <NewNav auth={login} handle={handleauth}/>

          <div id="page-wrap">
            <AnimatePresence>
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" exact render={()=><NewLogin handle={handleauth}/>} />
                <Route path="/announcement" component={Announcement} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/note" component={Note} />
                <Route path="/book" component={Books} />
                <Route path="/paper" component={Paper} />
              </Switch>
            </AnimatePresence>
          </div>
        </Router>
      </Provider>
    </>
  );
}

export default App;
