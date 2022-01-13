import { Card } from 'react-bootstrap';
import { Consumer } from '../../context';
import firebase from '../../firebase'
import './posts.css'

import { Link } from 'react-router-dom';

const Posts = ()=>  {

    
    
const deletePost=(id)=>{
    
    const firestoreDB = firebase.firestore().collection('posts')
    firestoreDB.where('id','==', id).get()
    .then((querySnapshot)=>{
        querySnapshot.forEach((doc=>{
            doc.ref.delete();
            setTimeout(()=>{window.location.reload(true)},4000)
        }))
    });

}
  

   
        return (
            <Consumer>
                {value=>{
                    const posts = value;
                    return(
                <div>
               {posts.map(post=>(
               <Card key={post.id} className="shadow mx-auto mt-2">
                    <Card.Header>
                        {post.title} 
                    <i onClick={()=>{deletePost(post.id)}} title='Delete Post' id='delete-button' className="bi bi-trash"></i> 
                    </Card.Header>
                        <Card.Body>
                            <img  id="feed" alt="" src={post.image}></img>
                            <h6 className='mt-2'>{post.location} 
                            <Link to={`/edit-post/${post.id}`}>
                            <i title='Edit Post' id='edit-button' className="bi bi-pencil-square"></i>
                            </Link>
                            </h6>
                            
                            
                        </Card.Body>
                </Card> 
               ))}
            </div>
            )
            }}
            </Consumer>
        )
    
}


export default Posts;