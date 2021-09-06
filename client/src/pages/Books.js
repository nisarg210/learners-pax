import axios from "axios";
import Lottie from "lottie-web";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Divider,
  Dropdown,
  Form,
  Grid,
  Header,
  Icon,
  Message,
  Modal,
  Segment,
} from "semantic-ui-react";
import Docuement from "../components/Docuement";
import { useAppState } from "../state";
import "./Books.css";
function Books() {
  const container = useRef(null);
  const [open, setOpen] = useState(false);
  const [branch, setBranch] = useState("");
  const [subject, setSubject] = useState("");
  const [semester, setSemester] = useState("");
  const [formSuccess, setformSuccess] = useState(false);
  const { setTeacher, getTeacher, isAuthenticated } = useAppState();
  const { register, handleSubmit } = useForm();
  const book = "book";

  const submit = async (data) => {
    try {
      let formdata = new FormData();
      const teacher=getTeacher()
      formdata.append("teachername", teacher.teacher.name);
      formdata.append("file", data.file[0]);
      formdata.append("semester", data.semester);
      formdata.append("subject", data.subject);
      formdata.append("branch", data.branch);
      formdata.append("category", book);
      formdata.append("name", data.file[0].name);
      const response = await axios.post(
        "http://localhost:5000/api/note/upload",
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    Lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../static/search1.json"),
    });
  }, []);
  return (
    <div className="book-body">
        <Segment placeholder>
      <div className="book-base">
     
        <div className="head-bar">
          <Header as="h2" icon textAlign="center">
            <Icon name="sticky book" circular />
            <Header.Content>Books</Header.Content>
          </Header>
        </div>
        <div className="paper_upload">
            <Modal
              closeIcon
              onClose={() => setOpen(false)}
              onOpen={() => setOpen(true)}
              open={open}
              trigger={isAuthenticated() ? <Button>Show Modal</Button> : ""}
            >
              <Modal.Header>Upload a Announcement</Modal.Header>
              <Modal.Content>
                <Modal.Description>
                  <Form success={formSuccess} onSubmit={handleSubmit(submit)}>
                    <Form.Field>
                      <label>Semester</label>
                      <input
                        {...register("semester", { required: true })}
                        name="semester"
                        value={semester}
                        onChange={(e) => setSemester(e.target.value)}
                        placeholder="semester"
                      />
                    </Form.Field>
                    <Form.Field>
                      <label>Branch</label>
                      <input
                        {...register("branch", { required: true })}
                        name="branch"
                        value={branch}
                        onChange={(e) => setBranch(e.target.value)}
                        placeholder="Branch"
                      />
                    </Form.Field>
                    <Form.Field>
                      <label>Subject</label>
                      <input
                        {...register("subject", { required: true })}
                        name="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Subject"
                      />
                    </Form.Field>
                    <Form.Field>
                      <input
                        {...register("file", { required: true })}
                        type="file"
                        placeholder="Search..."
                      />
                    </Form.Field>
                    <Message
                      success
                      header="Announcement added..."
                      content="Now it is live............"
                    />

                    <Button type="submit">Submit</Button>
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
        <div className="dropdown-menu-book">
          <div className="lottie" ref={container} ></div>

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

export default Books;
