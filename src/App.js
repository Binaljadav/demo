import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Create from './components/crud/Create';
import Home from './components/crud/Home';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/create' element={<Create/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
