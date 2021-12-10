import React, { Component } from 'react'
import logo from './logo.png';
import './feed.css'
import { Card, Button } from 'react-bootstrap';
import NewPost from '../new-post/NewPost';

export default class Feed extends Component {
    constructor(props){
        super(props);
        this.state = {showFeed: true}
        this.addNewPost = this.addNewPost.bind(this);
        
    }

    addNewPost(e){
        e.preventDefault()
        this.setState({showFeed : !this.state.showFeed});
    }

    render() {
        if(this.state.showFeed === true){
            return (
                <div className="container" style={{textAlign:'center'}}>
                
                    <img id="banner"src={logo} alt=""></img>
                
                    <Card className="shadow mx-auto mt-2">
                        <Card.Header>In Ottawa</Card.Header>
                        
                            <Card.Body>
                                <img id="feed" alt="" src={logo}></img>
                                <h6>Having Fun!!</h6>
                            </Card.Body>
                    </Card>
    
                    <Button title="New Post" id="new-post" onClick={this.addNewPost}><i id="plus" className="bi bi-plus-lg"></i></Button> 
                
                </div>
            )
        }else{
            return(
                <div>
                <NewPost/>
                <Button title="GO Back" id="new-post" onClick={this.addNewPost}><i id="plus" className="bi bi-arrow-90deg-left"></i></Button>
                </div>
            )
        }
        
    }
}
