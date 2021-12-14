import './App.css';
import Header from './components/header/Header';
import Feed from './components/feed/Feed';
import Footer from './components/footer/Footer';
import firebase from './firebase';


function App() {

 const ref = firebase.firestore().collection('posts');


 console.log(ref)

 ref.onSnapshot((querySnapshot)=>{
   const data =[];

   querySnapshot.forEach((doc)=>{
     data.push(doc.data())
   })

   console.log(data[0].location)
 })

  return (
    <div className="App">
      <Header></Header>
      <Feed/>
      <Footer></Footer>
    </div>
  );
}

export default App;
