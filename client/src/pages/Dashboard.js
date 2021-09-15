// import { Grid, Paper } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Card,
  Icon,
  Image,
  Grid,
  Button,
  Popup,
  Header,
  Form,
  Dropdown,
} from "semantic-ui-react";
import Notification from "../components/Notification";
import Tiles from "../components/Tiles";
import "./Dashboard.css";

function Dashboard() {
  const history = useHistory();
  const changeAddress = (name) => {
    history.push(`/${name}`);
  };
  return (
    <div className="dashboard-section">
      {/* <section className="dashboard-section">
        <div className="dashboard-container">

        </div>
      </section> */}
      <div className="dashboard-container">
        {/* <Grid container spacing={3}>
        <Grid item xs={6}> */}
        <Grid stackable columns={2} padded relaxed>
          <Grid.Column>
            <Tiles
              iconName="announcement"
              addName="announcement"
              title="Announcements"
            />
          </Grid.Column>
          {/* </Grid>
        <Grid item xs={6}> */}
          <Grid.Column>
            <Tiles iconName="sticky note" addName="note" title="Notes" />
          </Grid.Column>
          <Grid.Column>
            <Tiles iconName="book" addName="book" title="Books" />
          </Grid.Column>
          <Grid.Column>
            <Tiles iconName="newspaper outline" addName="paper" title="Paper" />
          </Grid.Column>
        </Grid>
        {/* </Grid>
      </Grid> */}
      </div>
      <div className="notification">
        <Notification />
      </div>
    </div>
  );
}

export default Dashboard;
