import Lottie from "lottie-web";
import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Divider,
  Dropdown,
  Form,
  Grid,
  Header,
  Icon,
  Input,
  Message,
  Modal,
  Segment,
} from "semantic-ui-react";
import { useForm } from "react-hook-form";
import Docuement from "../components/Docuement";
import { useAppState } from "../state";
import "./Note.css";
import configdata from "../static/config.json";
import axios from "axios";
function Note() {
  const container = useRef(null);
  const [open, setOpen] = useState(false);
  const [branch, setBranch] = useState("");
  const [subject, setSubject] = useState("");
  const [semester, setSemester] = useState("");
  const [formSuccess, setformSuccess] = useState(false);
  const { setTeacher, getTeacher, isAuthenticated } = useAppState();
  const { register, handleSubmit } = useForm();
  const [documentData, setdocumentData] = useState([]);
  const [error, setError] = useState(false);
  const [branchSelected, setBranchSelected] = useState("");
  const note = "note";
  const submit = async (data) => {
    try {
      let formdata = new FormData();
      const teacher = getTeacher();
      formdata.append("teachername", teacher.teacher.name);
      formdata.append("file", data.file[0]);
      formdata.append("semester", data.semester);
      formdata.append("subject", data.subject);
      formdata.append("branch", data.branch);
      formdata.append("category", note);
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

  const findNote = async (e, { value }) => {
    try {
      setdocumentData([]);
      const paperReceived = await axios.get(
        `http://localhost:5000/api/note/${note}/${branchSelected}/${value}`
      );
      setdocumentData(paperReceived.data);
      setError(false)
      console.log(paperReceived.data);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };
  useEffect(() => {
    console.log(getTeacher());
    Lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../static/notes.json"),
    });
  }, []);
  return (
    <div className="note-body">
 
        <div className="note-base">
          <div className="head-bar">
            <Header as="h2" icon textAlign="center">
              <Icon name="sticky note outline" circular />
              <Header.Content>Notes</Header.Content>
            </Header>
          </div>
          <div className="noteUpload">
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
          <div className="dropdown-menu-paper">
            <div className="search-note">
              <Header as="h3" textAlign="center">
                Select to get specific notes
              </Header>

              <Grid stackable centered columns={2} padded relaxed>
                <Grid.Column textAlign="center">
                  <Dropdown
                    value={branchSelected}
                    onChange={(e, { value }) => {
                      setBranchSelected(value);
                    }}
                    placeholder="Branch"
                    selection
                    options={configdata.branch}
                  />
                </Grid.Column>

                <Grid.Column textAlign="center">
                  <Dropdown
                  onChange={findNote}
                    placeholder="Semester"
                    selection
                    options={configdata.semester}
                  />
                </Grid.Column>
              </Grid>
            </div>
            <div
              className="lottie-paper"
              ref={
                container
              } /*onMouseEnter={()=>Lottie.play()}  onMouseLeave={()=>Lottie.stop()}*/
            ></div>
          </div>
        </div>
   

      {documentData.length ? (
        <div className="notefound">
          <Docuement data={documentData} />
        </div>
      ) : (
        ""
      )}
      {error && (
        <div className="notfound">
          <Segment placeholder>
            <Header icon>
              <Icon name="pdf file outline" />
              No documents are listed for this selection.
            </Header>
          </Segment>
        </div>
      )}
    </div>
  );
}

export default Note;
