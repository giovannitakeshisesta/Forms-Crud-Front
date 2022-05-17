import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import './style/App.css';
import Home from './views/Home';
import Page1 from './views/Page1';
import Page2 from './views/Page2';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <div>
        <Routes>
          <Route path='/'      element={<Home/>}/>
          <Route path='/page1' element={<Page1/>}/>
          <Route path='/page2' element={<Page2/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
