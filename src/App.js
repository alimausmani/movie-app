import './App.css';
import { Router ,Routes} from 'express';
import { Route } from 'react-router-dom';
import Home from './components/Home';
import MovieDetails from './components/MovieDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/movie/:id" element={<MovieDetails/>}/>
      </Routes>
    </Router>
  )
}
export default App;