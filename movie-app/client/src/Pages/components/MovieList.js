import React from "react";
import {useNavigate} from 'react-router-dom'

const MovieList = (props) =>{
    let navigate = useNavigate(); 
    return (
        <>
            {props.movies.map((movie,index)=> (
                <div className='image-container d-inline-flex justify-content-center img-fluid col-md-2 px-2' onClick={()=>{
                    navigate(`/movie/${movie.T_id}`)
                }}>
                    <img src={movie.T_poster} alt='movie' class="img-fluid"></img>
                    <div className="overlay d-flex align-items-center justify-content-center">
                        <>
                            <span className="mr-2">
                                {movie.T_time}
                            </span>
                        </>
                    </div>
                </div>
            ))}
        </>
    );
};
////w-25 
export default MovieList;