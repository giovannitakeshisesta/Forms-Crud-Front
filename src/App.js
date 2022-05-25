import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import './style/App.css';
import Home from './views/Home';
import MixedFormPage from './views/Page1';
import Page2 from './views/Page2';
import Page3 from './views/Page3';
import Page4 from './views/Page4';

function App() {
  return (
    <div >
      <Navbar/>
      <div className="container">
        <Routes>
          <Route path='/'      element={<Home/>}/>
          <Route path='/mixedFormPage' element={<MixedFormPage/>}/>
          <Route path='/page2' element={<Page2/>}/>
          <Route path='/page3' element={<Page3/>}/>
          <Route path='/page4' element={<Page4/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
