import React, { Component } from 'react';
import firebase from '../../firebase';
import { Card } from 'react-bootstrap';

export default class Posts extends Component {
    constructor(){
        super();
        this.state = {
            posts:[]
        }

        
    }

componentDidMount(){
    const firestoreDB = firebase.firestore().collection('posts');

    const data =[];
   
    firestoreDB.onSnapshot((querySnapshot)=>{
      
   
      querySnapshot.forEach((doc)=>{
        data.push(doc.data())
      });
      this.setState({posts:data});
});
}
  
    render() {
        return (
            <div>
               {this.state.posts.map(post=>(
               <Card key={post.id} className="shadow mx-auto mt-2">
                    <Card.Header>{post.title}</Card.Header>
                   
                        <Card.Body>
                            <img id="feed" alt="" src={post.image}></img>
                            <h6>{post.location}</h6>
                        </Card.Body>
                </Card> 
               ))}
            </div>
        )
    }
}
