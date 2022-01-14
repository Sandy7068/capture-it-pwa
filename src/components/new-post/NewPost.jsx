import React, { useState, useRef, useEffect} from 'react';
import { Form, Button } from 'react-bootstrap';
import firebase from '../../firebase';
import {v4 as uuidv4} from 'uuid';
import { initializeMedia} from '../../helper-functions';

//Declaring variable to store imageURL that we get from photo snap

const NewPost = () => {
  //Use State Hooks
  const [loader, setloader] = useState(false);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(`image-${uuidv4()}`);

  //useRef for conditional rendering and media options
  const captureButton = useRef();
  const videoFeed = useRef();
  const canvasFeed = useRef();

  //Firestore Storage
  const firebaseStorage = firebase.storage().ref();
  
  //submit function for formData
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

        //Resetting the state back to Normal
        setTitle("");
        setLocation("");
        setImage("");
    
    }

  //File change Handler for manual photo upload
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



  const animate = ()=>{
    videoFeed.current.style.display = 'none';
    canvasFeed.current.style.display = 'none';
    captureButton.current.style.display = 'none';
  }
  

  useEffect(() => {
    animate();
  }, [])
  
  const handleClick = ()=>{
    videoFeed.current.style.display = 'block';
    captureButton.current.style.display = 'block';
    var videoPlayer = document.querySelector('#player');
    initializeMedia(videoPlayer);
  }

  const captureImage = ()=>{
    canvasFeed.current.style.display = 'block';
    
    var videoPlayer = document.querySelector('#player');
    var canvas = document.querySelector('#canvas');
    
    const fileRef = firebaseStorage.child(image);
    var picture;
    var context = canvas.getContext('2d');

    context.drawImage(videoPlayer,0,0,canvas.width,videoPlayer.videoHeight/(videoPlayer.videoWidth/canvas.width));
    videoPlayer.srcObject.getVideoTracks().forEach((track)=>{
        track.stop();
        //console.log("Photo Taken");
    });
    
    picture = canvas.toDataURL();

    fetch(picture,{ credentials: 'include', mode: 'cors' })
    .then(res=>res.blob())
    .then((blob)=>{
        
         fileRef.put(blob).then(()=>{
             return fileRef.getDownloadURL();
         }).then(res=>{
           setImage(res)})   
    })
    
    videoFeed.current.style.display = 'none';
 
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