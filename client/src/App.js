import {Routes ,Route} from 'react-router-dom'
import './App.css';
import HomePage from './Components/Pages/HomePage';

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element = {<HomePage />} />
    </Routes>
    </>
  );
}

export default App;
