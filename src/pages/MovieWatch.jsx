/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiType from '../api/apiType';
import apiConfig from '../api/apiConfig';
import './detail.scss';
import Movies from '../components/movies/Movies';

const MovieWatch = () => {
    const {category, id} = useParams();
    const [data , setData] = useState(null);
    useEffect(() =>{
        const getWatchMovie = async () =>{ 
            const response = await apiType.detail(category, id, {params:{}});
            setData(response);  
            
        }
        getWatchMovie();
    },[category, id]);

    return (
        <>
            {
                data && (
                <div className="video">
                    <iframe
                        className='video__watch'
                        src={apiConfig.embedMovie(data.id)}
                        frameBorder="0"
                        allowFullScreen>
                    </iframe>
                    <div className='video__info'>
                        <h2 className='detail__info-title'>{data.title}</h2>
                        <p className='detail__info-overview text-nice'>{data.overview}</p>
                        <p className='detail__info-lang mb'>Original language : {data.original_language}</p>
                        <p className='detail__info-date'>Release Date : {data.release_date}</p>
                        <div className='detail__info-genres mb-1'>
                                    {
                                        data.genres && data.genres.slice(0,7).map((genres, i) =>(
                                            <span key={i} className='btnoutline2'>{genres.name}</span>
                                        ))
                                    }
                                </div>
                        <div className='detail__info-vote mb-2'>
                                    Rate : <span className='vote'>{data.vote_average.toFixed(1)} </span>({data.vote_count} votes)
                        </div>
                    </div>
                    <div className='similar'>
                        <div className=''>
                            <h1 className='mb-1'>Similar</h1>
                            <Movies category={category} type='similar' id={data.id} />
                        </div>
                    </div>
                </div>
                )
            }
        </>
    );
}



export default MovieWatch;