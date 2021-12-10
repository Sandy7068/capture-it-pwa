import './App.css';
import Header from './components/header/Header';
import Feed from './components/feed/Feed';
import Footer from './components/footer/Footer';
function App() {
  return (
    <div className="App">
      <Header></Header>
      <Feed/>
      <Footer></Footer>
    </div>
  );
}

export default App;
