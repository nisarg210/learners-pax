import React, { useState, useEffect } from "react";
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
import { useAppState } from "../state";
import configdata from "../static/config.json";
import { toast } from "react-toastify";
import axios from "axios";
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
  const { setTeacher, getTeacher, isAuthenticated } = useAppState();
  const [documents, setDocuments] = useState([]);
  const [deleted, setDeleted] = useState(false);
  useEffect(() => {}, [deleted]);
  useEffect(() => {
    if (isAuthenticated()) {
      const teacher = getTeacher();
      const teacher_own_note = data
        .filter(function (pre) {
          return pre.teacher === teacher.teacher.name;
        })
        .map(function (pre) {
          return pre;
        });
      setDocuments(teacher_own_note);
    } else {
      setDocuments(data);
    }
  }, []);
  const [loading, setloading] = useState(false);
  const deleteDoc = async (docid, event) => {
    event.stopPropagation();
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/note/${docid}`
      );
      const newDoc = documents
        .filter(function (pre) {
          return pre.docid !== docid;
        })
        .map(function (pre) {
          return pre;
        });
      toast.success("File Deleted successfully.");
      setDocuments(newDoc);
      setDeleted(!deleted);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="notefound">
      <Card.Group doubling centered itemsPerRow={3} stackable>
        {documents &&
          documents.map((card) => {
            const orgname = card.name;
            const orgdate = card.date;
            const infodate = orgdate.split("T");
            const date = infodate[0];
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
                    <Card.Description>
                      {card.subject}--{card.teacher}
                      <Card.Description>
                        {isAuthenticated() ? (
                          <Button
                            animated="vertical"
                            onClick={(event) => deleteDoc(card.docid, event)}
                          >
                            <Button.Content visible>
                              <Icon name="trash alternate" size="big" />
                            </Button.Content>
                            <Button.Content hidden>Delete</Button.Content>
                          </Button>
                        ) : (
                          ""
                        )}
                      </Card.Description>
                    </Card.Description>
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
