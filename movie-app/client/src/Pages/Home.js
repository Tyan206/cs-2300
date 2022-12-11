import React, {Component, useEffect, useState } from 'react';
import './Home.css';
import MovieList from './components/MovieList';
import MovieHeading from './components/MovieHeading';
import SearchBox from './components/SearchBox';
import MovieFilter from './components/MovieFilter';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios'

const Home = () => {
    
  const [movies, setMovies] = useState([]);
  const [FilterValue, setFilter]  =useState("");
  const [SearchValue, setSearchValue] = useState('');

  const [actionMovies, setActionMovies] = useState([]);
  const [newRelease, setNewRelease] = useState([]);
  const [streamOnPrime, setStreamOnPrime] = useState([]);


  useEffect(()=>{
    Axios.get("http://localhost:3001/api/get",{ params:{Filter: 'genre',Search:'Action',}}).then((response)=>{
      setActionMovies(response.data)
    })
  }, [])

  useEffect(()=>{
    Axios.get("http://localhost:3001/api/get",{ params:{Filter: 'release',Search:'',}}).then((response)=>{
      setNewRelease(response.data)
    })
  }, [])

  useEffect(()=>{
    Axios.get("http://localhost:3001/api/get",{ params:{Filter: 'streaming',Search:'prime',}}).then((response)=>{
      setStreamOnPrime(response.data)
    })
  }, [])




  useEffect(()=>{
    Axios.get("http://localhost:3001/api/get",{ params:{Filter: FilterValue,Search:SearchValue,}}).then((response)=>{
      setMovies(response.data)
    })
  }, [SearchValue])


  return (
    <div className='container-fluid movie-app'>
    <div className='row d-flex align-items-center mt-4 mb-4 capitalize'>
      <MovieHeading heading = 'EMDB'/>
      <SearchBox SearchValue={SearchValue} setSearchValue={setSearchValue}/>
      <MovieFilter FilterValue={FilterValue} setFilter={setFilter}/>
    </div>

    <div className='row'>
      <MovieList movies={movies}/>
    </div>

    <hr />
    <strong>
        Action Movies
    </strong>
    <div className='row'>
      <MovieList movies={actionMovies}/>
    </div>

    <hr />
    <strong>
      This Year Movies
    </strong>
    <div className='row'>
      <MovieList movies={newRelease}/>
    </div>


    <hr />
    <strong>
      Streaming on Prime Video
    </strong>
    <div className='row'>
      <MovieList movies={streamOnPrime}/>
    </div>

    </div>
  );
};

/*

 
    


*/

export default Home;
