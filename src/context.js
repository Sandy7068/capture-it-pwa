import React, { Component } from 'react';
import firebase from '../src/firebase';

const Context = React.createContext();

const reducer = (state,action)=>{
    switch(action.type){
        case 'DELETE_POST':
            return{
                ...state,
                posts: [state.posts.filter(post=>post.id !== action.payload)]
            }
            
        default:
            return state;
        
    }
}
const firestoreDB = firebase.firestore().collection('posts');
var data =[];

export class Provider extends Component{
    state={
        posts:[],
        dispatch: action=>{this.setState(state=>reducer(state,action))}
    }

    componentDidMount(){
        firestoreDB.onSnapshot((querySnapshot)=>{
            querySnapshot.forEach((doc)=>{
               data.push(doc.data())
            });
            this.setState({posts:data});
      });
    }

    render(){
        return(
            <Context.Provider value={this.state.posts}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export const Consumer = Context.Consumer;