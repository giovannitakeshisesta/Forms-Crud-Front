import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import './style/App.css';
import Home from './views/Home';
import MixedFormPage from './views/Page1';
import ImageInputPage from './views/ImageInputPage'
import FinalFormPage from './views/FinalFormPage';

function App() {
  return (
    <div >
      <Navbar/>
      <div className="container">
        <Routes>
          <Route path='/'      element={<Home/>}/>
          <Route path='/mixedFormPage' element={<MixedFormPage/>}/>
          <Route path='/imageInputPage' element={<ImageInputPage/>}/>
          <Route path='/finalform' element={<FinalFormPage/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
