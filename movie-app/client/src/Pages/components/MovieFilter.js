import React from "react";

const MovieFilter =  (props) => {
    return (
        <div className='col'>
            <select className='col col-sm-8 me-5 filter-select' value={props.FilterValue} onChange={(event) =>{
            const selectedFilter = event.target.value
            props.setFilter(selectedFilter)
            }}>
            <option value='title'>Title Name</option>
            <option value='name'>Person Name</option>
            <option value='genre'>Genre</option>
            <option value='service'>Service</option>
            </select>
        </div>
    );
};

export default MovieFilter;