import React, { useState} from 'react';
import { Form, Button } from 'react-bootstrap';
import firebase from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';


const firestoreDB = firebase.firestore().collection('posts');
var post_data = [];

const EditPost = () => {

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

    const{id} = useParams();



 firestoreDB.where('id','==', id)
  .get()
  .then((querySnapshot)=>{
    querySnapshot.forEach((doc)=>{
      post_data.push(doc.data())
    });
    if(loading === false){
      setTitle(post_data[0].title);
      setLocation(post_data[0].location);
      setLoading(true);
    }
    
});


  function onSubmit(e){
    e.preventDefault();
      setTitle("");
      setLocation("");
      
      var formData = {
        id,
        title,
      location
    };

    console.log(formData)
      
        
      firestoreDB.doc(id).update(formData).then(()=>{
        alert("Your Post has been updated");
        
        navigate('/')
      })
   
  }
 


return (
  <div className="container mx-auto">
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Change Title?</Form.Label>
          <Form.Control name='title' value={title} type="text" placeholder="Describe your Feelings" onChange={event => {
            if(loading === true){setTitle(event.target.value)}}}/>
          <Form.Text className="text-muted">
            What did this picture made you feel?
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>Location</Form.Label>
          <Form.Control name='location' value={location} type="text" placeholder="Where did you take this picture?" onChange={event => 
            {if(loading === true){
              setLocation(event.target.value)
            }}}/>
        </Form.Group>
        <Button variant="primary mb-2" type="submit">
          Submit
        </Button>
      </Form>
  </div>
)

}

export default EditPost;