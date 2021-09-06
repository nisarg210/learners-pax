import React, { useState } from "react";
import {
  Button,
  Card,
  Icon,
  Image,
  Label,
  Placeholder,
  Segment,
} from "semantic-ui-react";
import "./Docuement.css";
import configdata from "../static/config.json";
// const cards = [
//   {
//     avatar: "../static/pdf.png",
//     date: "Joined in 2013",
//     header: "Helen",
//     description: "Primary Contact",
//   },
//   {
//     avatar: "/images/avatar/large/matthew.png",
//     date: "Joined in 2013",
//     header: "Matthew",
//     description: "Primary Contact",
//   },
//   {
//     avatar: "/images/avatar/large/molly.png",
//     date: "Joined in 2013",
//     header: "Molly",
//     description: "Primary Contact",
//   },
// ];

function Docuement(props) {
  const { data } = props;
  const [loading, setloading] = useState(false);

  return (
    <div className="notefound">
      <Card.Group doubling centered itemsPerRow={3} stackable>
        {data &&
          data.map((card) => {
            const orgname = card.name;
            const orgdate=card.date;
            const infodate=orgdate.split("T");
            const date= infodate[0];
            const info = orgname.split(".");
            const name = info[0];
            const ext = info[1];
            const url = configdata.url.concat(card.docid);
            let iconName;
            let color;
            console.log(name, ext);
            switch (ext) {
              case "pdf":
                color = "pink";
                iconName = "file pdf outline";
                break;
              case "docx":
                color = "teal";
                iconName = "file word outline";
                break;
              case "zip":
                color = "brown";
                iconName = "file archive outline";
                break;
              default:
                iconName = "file outline";
                break;
            }
            return (
              <Card
                link
                raised
                centered
                fluid
                raised
                className="mycard"
                onClick={() => {
                  window.open(url, "_blank").focus();
                }}
                key={card.name}
              >
                {loading ? (
                  <Placeholder>
                    <Placeholder.Image square />
                  </Placeholder>
                ) : (
                  ""
                )}

                <Card.Content>
                  <center>
                    <Icon
                      color={color}
                      className="icon-display"
                      name={iconName}
                      size="massive"
                    />
                    <Card.Header as="h3">{name}</Card.Header>
                    <Card.Meta>{date}</Card.Meta>
                    <Card.Description>{card.subject}</Card.Description>
                  </center>
                </Card.Content>
              </Card>
            );
          })}
      </Card.Group>
    </div>
  );
}

export default Docuement;
