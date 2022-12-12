import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {Row,Col, Tag} from 'antd'
import ReactPlayer from 'react-player'
import Axios from 'axios'

import './MoviePage.css'



const MoviePage = () => {
  let navigate = useNavigate();
  let { titleid } = useParams();
  const [title, setTitle] = useState([]);
  const [genres, setGenres] = useState([]);
  const [actors, setActors] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [writers, setWriters] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(()=>{
    Axios.get("http://localhost:3001/api/get",{ params:{Filter: "id",Search: titleid,}}).then((response)=>{
      setTitle(response.data)
      console.log(response.data)
      console.log(title)
    })
  },[])

  useEffect(()=>{
    Axios.get("http://localhost:3001/api/get",{ params:{Filter: "genreid",Search: titleid,}}).then((response)=>{
      setGenres(response.data)
    })
  }, [])

  useEffect(()=>{
    Axios.get("http://localhost:3001/api/get",{ params:{Filter: "actor",Search: titleid,}}).then((response)=>{
      setActors(response.data)
    })
  }, [])

  useEffect(()=>{
    Axios.get("http://localhost:3001/api/get",{ params:{Filter: "director",Search: titleid,}}).then((response)=>{
      setDirectors(response.data)
    })
  }, [])

  useEffect(()=>{
    Axios.get("http://localhost:3001/api/get",{ params:{Filter: "writer",Search: titleid,}}).then((response)=>{
      setWriters(response.data)
    })
  }, [])

  useEffect(()=>{
    Axios.get("http://localhost:3001/api/get",{ params:{Filter: "serviceid",Search: titleid,}}).then((response)=>{
      setServices(response.data)
    })
  }, [])

let info = {
  T_id: '',
  T_name: '',
  T_type: '',
  T_status: '',
  T_country: '',
  T_time: '',
  T_poster: '',
  T_release: '',
  T_cert: '',
  T_story: '',
  Y_links: '',
}
  
  title.map((name)=>{
    return Object.entries(name).map((entry)=>{
      info.T_id = name.T_id
      info.T_name = name.T_name
      info.T_type = name.T_type
      info.T_status = name.T_status
      info.T_country = name.T_country
      info.T_time = name.T_time
      info.T_poster = name.T_poster
      info.T_release = name.T_release
      info.T_cert = name.T_cert
      info.T_story = name.T_story
      info.Y_links = name.Y_links
    })
  })

  function cost(price){
    if(price == '0'){
      return 'Free'
    }else{return '$'+price}
  }
  
  return (
    <>
      <button className="homepage" onClick={()=>{
        navigate('/')
      }}>
        HOME
      </button>
      <Row>
        <Col span={8} >
          
          <img alt='movie' width='100%' src={info.T_poster} class="img-fluid"></img>
        </Col>

        <Col span={12} offset={1}>
        <strong className="name">{info.T_name}</strong>
          <hr />
          <strong> Description: </strong>
          <p>{info.T_story}</p>
          <hr />
          <div className='genre'>
            <span className='genreTitle'>
              <strong>Genres: </strong>
            </span>
            {genres.map(genre => <Tag color={'darkslategray'} key={genre.G_name}>{genre.G_name}</Tag>)}
          </div>
          <hr />
          <div className='actor'>
            <span className='actorTitle'>
              <strong>Actors: </strong>
            </span>
            {actors.map(actor => <Tag color={'darkolivegreen'}  key={actor.name}>{actor.name}({actor.A_role})</Tag>)}
          </div>
          <hr />
          <div className='director'>
            <span className='directorTitle'>
              <strong>Director: </strong>
            </span>
            {directors.map(director => <Tag color={'midnightblue'}  key={director.name}>{director.name}</Tag>)}
          </div>
          <hr />
          <div className='writer'>
            <span className='writerTitle'>
              <strong>Writer: </strong>
            </span>
            {writers.map(writer => <Tag color={'teal'}  key={writer.name}>{writer.name}</Tag>)}
          </div>
          <hr />
          <div className='service'>
            <span className='serviceTitle'>
              <strong>Service: </strong>
            </span>
            {services.map(service => <button key={service.S_name} onClick={()=>{
              window.open(service.S_url, '_blank', 'noreferrer');
            }}>{service.S_name} / {cost(service.S_price)}</button>)}
          </div>
          <hr />
          <div className='trailer'>
            <strong> Trailer: </strong>
          </div>
          <ReactPlayer url= {info.Y_links} controls ={true}/>
        </Col>  

          

          
         
    
   

      
      </Row>
    </>
  );
};

export default MoviePage;
