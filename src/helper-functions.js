//Get access to camera
export const initializeMedia = (videoDiv)=>{
        
    //FOR BROWSERS OTHER THAN CHROME
    // if(!('mediaDevices' in navigator)){
    //     navigator.mediaDevices = {};
    // }
    
    // if(!('getUserMedia' in navigator)){
    //     navigator.mediaDevices.getUserMedia = (constraints)=>{
    //         var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    //         if(!getUserMedia){
    //             return Promise.reject(new Error('GetUserMedia not implemented!!'))
    //         }

    //         return new Promise((resolve,reject)=>{
    //             getUserMedia.call(navigator,constraints,resolve,reject);
    //         });
    //     }
    // }
    
    
    navigator.mediaDevices.getUserMedia({video:true})
    .then((stream)=>{
        videoDiv.srcObject = stream;
        console.log("camera Working")
    })
    .catch((err)=>{
        console.log(err)
    })
};

//project the videofeed from a camera to a canvas and return blob of the screenshot
//and then store that blob to firestore fileref
export const imagetoBlob = (video,canvas,firestorefileRef)=>{
var picture;
    var context = canvas.getContext('2d');
    context.drawImage(video,0,0,canvas.width,video.videoHeight/(video.videoWidth/canvas.width));
    video.srcObject.getVideoTracks().forEach((track)=>{
        track.stop();
        console.log("Photo Taken");
    });
    
    picture = canvas.toDataURL();

    fetch(picture,{ credentials: 'include', mode: 'cors' })
    .then(res=>res.blob())
    .then(blob=>{
        firestorefileRef.put(blob).then(()=>{
            console.log("Image Uploaded")
        })
        
    });   
}