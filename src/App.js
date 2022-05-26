import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import './style/App.css';
import Home from './views/Home';
import MixedFormPage from './views/Page1';
import Page2 from './views/Page2';
import Page3 from './views/Page3';
import ImageInputPage from './views/ImageInputPage'

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
          <Route path='/imageInputPage' element={<ImageInputPage/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
