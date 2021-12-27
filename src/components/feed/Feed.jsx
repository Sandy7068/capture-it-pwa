import React, { Component } from 'react'
import logo from './logo.png';
import './feed.css'
import { Button } from 'react-bootstrap';
import Posts from '../posts/Posts';


export default class Feed extends Component {
    

    render() {
        
            return (
                <div className="container" style={{textAlign:'center'}}>
                
                    <img id="banner"src={logo} alt=""></img>
                    <Posts/>
                    <Button href='/new-post' title="New Post" id="new-post"><i id="plus" className="bi bi-plus-lg"></i>
                    
                    </Button> 
                
                </div>
            )
        
        
    }
}
