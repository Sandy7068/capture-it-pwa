import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

export default class NewPost extends Component {
  constructor(){
    super()
    this.state = {title:"",location:""}
  }

  onChange(e){
    
  }

    render() {
        return (
            <div className="container mx-auto">
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="email" placeholder="Describe your Feelings" />
                    <Form.Text className="text-muted">
                      What did this picture made you feel?
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Location</Form.Label>
                    <Form.Control type="password" placeholder="Where did you take this picture?" />
                  </Form.Group>
                  <Button variant="primary mb-2" type="submit">
                    Submit
                  </Button>
                </Form>
            </div>
        )
    }
}
