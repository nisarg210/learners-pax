import React from "react";
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

function App() {
  // let location = useLocation();
  return (
    <>
      <Router>
        <NewNav />

        <div id="page-wrap">
          <AnimatePresence>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/login" exact component={NewLogin} />
              <Route path="/announcement" component={Announcement} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/note" component={Note} />
            </Switch>
          </AnimatePresence>
        </div>
      </Router>
    </>
  );
}

export default App;
