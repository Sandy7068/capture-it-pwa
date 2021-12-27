import React, { useState} from 'react';
import { Form, Button } from 'react-bootstrap';
import firebase from '../../firebase';
import {v4 as uuidv4} from 'uuid';

const NewPost = () => {

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");

  function onSubmit(e){
    e.preventDefault();
      setTitle("");
      setLocation("");
      const firestoreDB = firebase.firestore().collection('posts');
      var formData = {
        id:uuidv4(),
        title,
      location};
      
        
      firestoreDB.add(formData).then(()=>{
        alert("your Post has been submitted")
      })
   
  }
 


return (
  <div className="container mx-auto">
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control name='title' value={title} type="text" placeholder="Describe your Feelings" onChange={event => setTitle(event.target.value)}/>
          <Form.Text className="text-muted">
            What did this picture made you feel?
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>Location</Form.Label>
          <Form.Control name='location' value={location} type="text" placeholder="Where did you take this picture?" onChange={event => setLocation(event.target.value)}/>
        </Form.Group>
        <Button variant="primary mb-2" type="submit">
          Submit
        </Button>
      </Form>
  </div>
)

}

export default NewPost;