import React, { useState, useRef, useEffect} from 'react';
import { Form, Button } from 'react-bootstrap';
import firebase from '../../firebase';
import {v4 as uuidv4} from 'uuid';
import { initializeMedia, imagetoBlob } from '../../helper-functions';

//Declaring variable to store imageURL that we get from photo snap
var picture;

const NewPost = () => {
  const [loader, setloader] = useState(false);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");

  //useRef for conditional rendering and media options
  const captureButton = useRef();
  const videoFeed = useRef();
  const canvasFeed = useRef();
  

  function onSubmit(e){
    e.preventDefault();
      const firestoreDB = firebase.firestore().collection('posts');
      var formData = {
        id:uuidv4(),
        title,
        location,
      image}; 
      firestoreDB.add(formData).then(()=>{
        alert("your Post has been submitted")
      });

  
      
      setTitle("");
      setLocation("");
      setImage("");
   
  }

  const refTest = ()=>{
    if(loader===false){
        captureButton.current.style.display = 'none';
        canvasFeed.current.style.display = 'none';
    }else{
        captureButton.current.style.display = 'block';
    }   
}

  const invisible = {display:'none'};
  const firebaseStorage = firebase.storage().ref();

  useEffect(()=>{
    refTest();
      if(loader===true){
        var videoPlayer = document.querySelector('#player');
        initializeMedia(videoPlayer);
      }else return;
    
  },[loader])

  
const onFileChange = async(e)=>{
  const file = e.target.files[0];
  const fileRef = firebaseStorage.child(file.name);
  await fileRef.put(file).then(()=>{
    console.log('file uploaded')
  });
  const fileURL = await fileRef.getDownloadURL();
  setImage(fileURL);
  console.log("File uploaded")
}




 
  const handleClick = ()=>{setloader(true)}

  const captureImage = ()=>{
    var videoPlayer = document.querySelector('#player');
    var canvas = document.querySelector('#canvas');
    const fileRef = firebaseStorage.child(image);
    imagetoBlob(videoPlayer,canvas,fileRef)
 
}

return (
  <div className="container mx-auto">
      <Form onSubmit={onSubmit}>
        <div style={{textAlign:'center'}}>
          <video className='mt-2' ref={videoFeed} id='player' autoPlay></video>
          <canvas ref={canvasFeed} id="canvas" width={'320px'} height={'240px'}></canvas>
        </div>
        <div style={{textAlign:'center'}}>
        <i onClick={()=>{handleClick()}} className="bi bi-camera2"></i><h6>Use Camera</h6>
          <Button ref={captureButton} onClick={()=>{captureImage()}} className="btn btn-primary">Capture-It</Button>
      </div>
      <Form.Group>
      <Form.Label className='mt-2'>Do you want to upload a photo Instead?</Form.Label>
        <Form.Control className="file-label" type={'file'} accept='image/*' id='image-picker' onChange={onFileChange}></Form.Control>
          <Form.Text className="text-muted">
            Please make sure the file is a jpg/png.
          </Form.Text>
      </Form.Group>
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