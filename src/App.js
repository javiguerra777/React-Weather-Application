import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import About from './pages/About';
import NavBar from './components/NavBar';

function App() {
  return(
    <section>
    <NavBar />
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/about/" element={<About />} />
    </Routes>
    </section>
  )
}

export default App;
