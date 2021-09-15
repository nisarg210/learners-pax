import axios from 'axios';
import React, { useState } from 'react'
import { Button, Dropdown, Form, Message, Modal, Popup } from 'semantic-ui-react'
import configdata from "../static/config.json";
function Notification() {
    const [email, setEmail] = useState("");
  const [semester, setSemester] = useState("");
  const [branch, setBranch] = useState("");
  const [name, setName] = useState("")
  const [formsuccess, setFormsuccess] = useState(false)
  const sendNotifyUser =async()=>{
      setFormsuccess(false);
      try {
        const response =await axios.post("http://localhost:5000/api/notifiy",
        {
            email:email,
            semester:semester,
            name:name,
            branch:branch
        })
        setFormsuccess(true);
        setBranch("");
        setEmail("");
        setName("");
        setSemester("");
        console.log(response.data);
      } catch (error) {
          console.error(error)
      }
   
  }
    return (
        <>
             <Popup
          trigger={
            <Button circular size="huge" color="google plus" icon="mail" />
          }
          flowing
          hoverable
          onOpen={()=>{setFormsuccess(false)}}
        >
          <Form success={formsuccess}>
            <Form.Field>
              <label>Email</label>
              <input value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="abc@abc.com" />
            </Form.Field>
            <Form.Field>
              <label>Name</label>
              <input value={name} onChange={(e)=>{setName(e.target.value)}} placeholder="Last Name" />
            </Form.Field>
            <Form.Field>
            <label>Semester</label>
              <Dropdown
              value={semester} onChange={(e,{value})=>{setSemester(value)}}
                placeholder="Semester"
                selection
                options={configdata.semester}
              />
            </Form.Field>
            <Form.Field>
            <label>Branch</label>
              <Dropdown
              value={branch} onChange={(e,{value})=>{setBranch(value)}}
                placeholder="Branch"
                selection
                options={configdata.branch}
              />
            </Form.Field>
            <Button onClick={sendNotifyUser}>Submit</Button>
            <Message
      success
      header='Form Completed'
      content="You're all signed up for the newsletter"
    />
          </Form>
        </Popup>
        </>
    )
}

export default Notification
