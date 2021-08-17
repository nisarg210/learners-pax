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
import "./Note.css";
function Note() {
  const container = useRef(null);
  useEffect(() => {
    Lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: false,
      animationData: require("../static/notes.json"),
    });
  }, []);
  return (
    <div className="note-body">
        <Segment placeholder>
      <div className="note-base">
     
        <div className="head-bar">
          <Header as="h2" icon textAlign="center">
            <Icon name="sticky note outline" circular />
            <Header.Content>Notes</Header.Content>
          </Header>
        </div>
       
        <div className="dropdown-menu-note">
          <div className="lottie" ref={container} onMouseEnter={()=>Lottie.play()}  onMouseLeave={()=>Lottie.stop()}></div>

          <div className="search">
            <Header as="h3" textAlign="center">
            Select to get specific notes
            </Header>
            
            <Grid stackable centered columns={3} padded relaxed>
              <Grid.Column textAlign="center">
                <Dropdown placeholder="Branch" selection />
              </Grid.Column>

              <Grid.Column textAlign="center">
                <Dropdown placeholder="Semester" selection />
              </Grid.Column>
              <Grid.Column textAlign="center">
                <Dropdown placeholder="Subject" selection />
              </Grid.Column>
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

export default Note;
