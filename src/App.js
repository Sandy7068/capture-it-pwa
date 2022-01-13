import React, { Component } from 'react'
import './App.css';
import Header from './components/header/Header';
import Feed from './components/feed/Feed';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/footer/Footer';
import NewPost from './components/new-post/NewPost';
import EditPost from './components/edit-post/EditPost';
import { Provider } from './context';

export default class App extends Component {


render(){
  return (
    <Provider>
    <Router>
      <div className="App">
      <Header></Header>
      <Routes>
      <Route path='/' element={<Feed/>}/>
      <Route path="/new-post" element={<NewPost/>}/>
      <Route path="/edit-post/:id" element={<EditPost/>}/>
      </Routes>
      <Footer></Footer>
    </div>
    </Router>
    </Provider>
  );
}
  
}


