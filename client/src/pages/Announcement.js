import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Container,
  Divider,
  Dropdown,
  Form,
  Grid,
  Header,
  Icon,
  Image,
  Message,
  Modal,
} from "semantic-ui-react";
import AnnoMessage from "../components/AnnoMessage";
import "./Announcement.css";
import axios from "axios";

function Announcement() {
  const [formSuccess, setformSuccess] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const [branch, setBranch] = useState("");
  const [subject, setSubject] = useState("");
  const [semester, setSemester] = useState("");
  const [branchSelected, setBranchSelected] = useState("")
  const [semesterSelected, setSemesterSelected] = useState("");
  const sendAnnouncement = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/announcement",
        {
          title: title,
          description: description,
          subject: subject,
          branch: branch,
          semester: semester,
          teacher: "nisarg",
        }
      );
      console.log(response);
      setformSuccess(true);
    } catch (error) {
      console.error(error);
    }
  };

  const searchAnno =async(e,{value})=>{
    
    const response =await axios.get("http://localhost:5000/api/announcement",{
      branch:"branchSelected",
      semester:value,
    })

    console.log(response.data);
  }
  useEffect(() => {
    console.log("sad");
  }, [formSuccess]);
  const detail = [
    {
      name: "teacher",
      date: "September 14, 2013",
      title: "time table update",
    },
    {
      name: "teacher",
      date: "September 14, 2013",
      title: "time table update",
    },
    {
      name: "teacher",
      date: "September 14, 2013",
      title: "time table update",
    },
    {
      name: "teacher",
      date: "September 14, 2013",
      title: "time table update",
    },
    {
      name: "teacher",
      date: "September 14, 2013",
      title: "time table update",
    },
    {
      name: "teacher",
      date: "September 14, 2013",
      title: "time table update",
    },
    {
      name: "teacher",
      date: "September 14, 2013",
      title: "time table update",
    },
    {
      name: "teacher",
      date: "September 14, 2013",
      title: "time table update",
    },
  ];

  const branchDrop = [
    {
      text: "CE",
      value: "CE",
    },
    {
      text: "IT",
      value: "IT",
    },

    {
      text: "EC",
      value: "EC",
    },

    {
      text: "MH",
      value: "MH",
    },

    {
      text: "CH",
      value: "CH",
    },
    {
      text: "CL",
      value: "CL",
    },
  ];
  const semesterDrop = [
    {
      text: "1",
      value: "1",
    },
    {
      text: "2",
      value: "2",
    },

    {
      text: "3",
      value: "3",
    },

    {
      text: "4",
      value: "4",
    },

    {
      text: "5",
      value: "5",
    },
    {
      text: "6",
      value: "6",
    },
    {
      text: "7",
      value: "7",
    },
    {
      text: "8",
      value: "8",
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
      <div className="upload_announcement">
        <Modal
          closeIcon
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          trigger={<Button>Show Modal</Button>}
        >
          <Modal.Header>Upload a Announcement</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Form success={formSuccess}>
                <Form.Field>
                  <label>Title</label>
                  <input
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="First Name"
                  />
                </Form.Field>
                <Form.Field>
                  <label>Semester</label>
                  <input
                    name="semester"
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    placeholder="semester"
                  />
                </Form.Field>
                <Form.Field>
                  <label>Branch</label>
                  <input
                    name="branch"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    placeholder="Branch"
                  />
                </Form.Field>
                <Form.Field>
                  <label>Subject</label>
                  <input
                    name="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Subject"
                  />
                </Form.Field>
                <Form.Field>
                  <Form.TextArea
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    label="Description"
                    placeholder="Tell us more about you..."
                  />
                </Form.Field>
                <Message
                  success
                  header="Announcement added..."
                  content="Now it is live............"
                />

                <Button onClick={sendAnnouncement} type="button">
                  Submit
                </Button>
              </Form>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button
              content="Close"
              labelPosition="right"
              icon="close"
              onClick={() => setOpen(false)}
              negative
            />
          </Modal.Actions>
        </Modal>
      </div>
      <div className="dropdown-menu">
        <Divider horizontal>Select to get updates</Divider>
        <Grid stackable centered columns={2} padded relaxed>
          <Grid.Column textAlign="center">
            <Dropdown value={branchSelected} onChange={(e,{value})=>{setBranchSelected(value)}} placeholder="Branch" selection options={branchDrop} />
          </Grid.Column>
          {/* (e,{value})=>{setSemesterSelected(value)} */}
          <Grid.Column textAlign="center">
            <Dropdown  onChange={searchAnno} placeholder="Semester" selection options={semesterDrop} />
          </Grid.Column>
          {/* <Grid.Column textAlign="center">
            <Dropdown placeholder="Subject" selection options={} />
          </Grid.Column> */}
        </Grid>
      </div>
      <div className="messages">
        {semesterSelected}
        {/* <AnnoMessage data={detail} /> */}
        <br />
      </div>
    </div>
  );
}

export default Announcement;
