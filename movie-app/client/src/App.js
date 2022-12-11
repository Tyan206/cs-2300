import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import MoviePage from './Pages/MoviePage';
import Home from './Pages/Home';


function App () {

  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Home />}/>
        <Route path="/movie/:titleid" element={<MoviePage />}/>
      </Routes>
    </Router>
  );
  
};
export default App;