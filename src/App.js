import React, { Component } from 'react'
import './App.css';
import Header from './components/header/Header';
import Feed from './components/feed/Feed';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/footer/Footer';
import NewPost from './components/new-post/NewPost';

export default class App extends Component {
render(){
  return (
    <Router>
      <div className="App">
      <Header></Header>
      <Routes>
      <Route path='/' element={<Feed/>}/>
      <Route path="/new-post" element={<NewPost></NewPost>}/>
      </Routes>
      <Footer></Footer>
    </div>
    </Router>
    
  );
}
  
}


