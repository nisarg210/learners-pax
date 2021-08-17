import Lottie from "lottie-web";
import React, { useEffect, useRef } from "react";
import {
  Button,
  Divider,
  Dropdown,
  Grid,
  Header,
  Icon,
  Segment,
} from "semantic-ui-react";
import Docuement from "../components/Docuement";
import "./Paper.css";
function Paper() {
  const container = useRef(null);
  useEffect(() => {
    Lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../static/search3.json"),
    });
  }, []);
  return (
    <div className="paper-body">
        <Segment placeholder>
      <div className="paper-base">
     
        <div className="head-bar">
          <Header as="h2" icon textAlign="center">
            <Icon name="sticky newspaper outline" circular />
            <Header.Content>Paper</Header.Content>
          </Header>
        </div>
       
        <div className="dropdown-menu-paper">
          <div className="lottie-paper" ref={container} ></div>

          <div className="search-note">
            <Header as="h3" textAlign="center">
            Select to get specific notes
            </Header>
            
            <Grid stackable centered columns={3} padded relaxed>
              <Grid.Row textAlign="center">
                <Dropdown placeholder="Branch" selection />
              </Grid.Row>

              <Grid.Row textAlign="center">
                <Dropdown placeholder="Semester" selection />
              </Grid.Row>
              <Grid.Row textAlign="center">
                <Dropdown placeholder="Subject" selection />
              </Grid.Row>
            </Grid>
          </div>
        </div>
       
      </div>
      </Segment>
    
      <div className="notfound">
        <Segment placeholder>
          <Header icon>
            <Icon name="pdf file outline" />
            No documents are listed for this customer.
          </Header>
          <Button primary>Add Document</Button>
        </Segment>
      </div>
      <div className="notefound">
        <Docuement />
      </div>
    </div>
  );
}

export default Paper;