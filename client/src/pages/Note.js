import React from "react";
import {
  Button,
  Divider,
  Dropdown,
  Grid,
  Header,
  Icon,
  Segment,
} from "semantic-ui-react";
import "./Note.css";
function Note() {
  return (
    <div className="note-body">
      <div className="note-base">
        <div className="head-bar">
          <Header as="h2" icon textAlign="center">
            <Icon name="sticky note outline" circular />
            <Header.Content>Notes</Header.Content>
          </Header>
        </div>
        <div className="dropdown-menu">
          <Divider horizontal>Select to get specific notes</Divider>
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
          hello
      </div>
    </div>
  );
}

export default Note;
