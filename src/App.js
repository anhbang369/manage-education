import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import Navbar from './components/navbar/Navbar';
import View from './components/syllabus/View';
import Footer from './components/footer/Footer';
import { Routes } from './Routes';

function App() {
  return (
    <>
      {/* <Navbar></Navbar>
      <div className='main'>
        <Sidebar></Sidebar>
        <div className="container">
          <View></View>
        </div>
      </div>
      <Footer></Footer> */}
      <Routes />
    </>

  );
}

export default App;
