import React from "react";
import { Divider, Dropdown, Grid, Header, Icon } from "semantic-ui-react";
import "./Announcement.css";
function Announcement() {
  const friendOptions = [
    {
      key: "Jenny Hess",
      text: "Jenny Hess",
      value: "Jenny Hess",
      image: { avatar: true, src: "/images/avatar/small/jenny.jpg" },
    },
    {
      key: "Elliot Fu",
      text: "Elliot Fu",
      value: "Elliot Fu",
      image: { avatar: true, src: "/images/avatar/small/elliot.jpg" },
    },
    {
      key: "Stevie Feliciano",
      text: "Stevie Feliciano",
      value: "Stevie Feliciano",
      image: { avatar: true, src: "/images/avatar/small/stevie.jpg" },
    },
    {
      key: "Christian",
      text: "Christian",
      value: "Christian",
      image: { avatar: true, src: "/images/avatar/small/christian.jpg" },
    },
    {
      key: "Matt",
      text: "Matt",
      value: "Matt",
      image: { avatar: true, src: "/images/avatar/small/matt.jpg" },
    },
    {
      key: "Justen Kitsune",
      text: "Justen Kitsune",
      value: "Justen Kitsune",
      image: { avatar: true, src: "/images/avatar/small/justen.jpg" },
    },
  ];

  const options = [
    { key: 1, text: "Choice 1", value: 1 },
    { key: 2, text: "Choice 2", value: 2 },
    { key: 3, text: "Choice 3", value: 3 },
  ];
  return (
    <div className="acc-base">
      <div className="head-bar">
        <Header as="h2" icon textAlign="center">
          <Icon name="announcement" circular />
          <Header.Content>Announcements</Header.Content>
        </Header>
      </div>
      <div className="dropdown-menu">
        <Divider horizontal>Select to get updates</Divider>
        <Grid stackable centered columns={3} padded relaxed>
          <Grid.Column textAlign="center">
            <Dropdown placeholder="Branch" selection options={friendOptions} />
          </Grid.Column>

          <Grid.Column textAlign="center">
            <Dropdown
              placeholder="Semester"
              selection
              options={friendOptions}
            />
          </Grid.Column>
          <Grid.Column textAlign="center">
            <Dropdown placeholder="Subject" selection options={friendOptions} />
          </Grid.Column>
        </Grid>
      </div>
    </div>
  );
}

export default Announcement;
