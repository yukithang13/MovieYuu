import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PlayCircleFilled } from '@ant-design/icons';
import apiType from '../api/apiType';
import apiConfig from '../api/apiConfig';
import './detail.scss';
import CastList from '../components/CastList/CastList';
import Movies from '../components/movies/Movies'



const Detail = () =>{
    const {category, id} = useParams();
    const [data , setData] = useState(null)
    useEffect(() =>{
        const getDetail = async () =>{ 
            const response = await apiType.detail(category, id, {params:{}});
            setData(response);  
            console.log(response);  
        }
        getDetail()
    },[category, id]);
    
    return (
        <>
        {
            data && (
                <>
                    <div className='banner' style={{backgroundImage: `url(${apiConfig.originalImage(data.backdrop_path || data.poster_path)})`}}></div>
                    <div className='detail'>
                        <div className='detail__img'>
                            <img className='detail__img-1' src={apiConfig.w500Image(data.poster_path)} alt="" />
                        </div>
                        <div className='detail__info'>
                                <Link 
                                    to={`/${category}/${data.id}/watch`} 
                                    
                                    className='mb-1 btn'> 
                                <PlayCircleFilled className='playwatch' /> 
                                Watch now
                                </Link>
                                <h2 className='detail__info-title mb'>{data.title}</h2>
                                <p className='detail__info-overview mb-1'>{data.overview}</p>
                                <p className='detail__info-lang mb'>Original language : {data.original_language}</p>
                                <p className='detail__info-date mb-1'>Release Date : {data.release_date}</p>
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
                    </div>
                   
                    <div className='cast'>
                        <div className=''>
                            <h1 className='mb-1'>Casts</h1>
                            <CastList id={data.id} />
                        </div>
                    </div>
                   
                    <div className='cast'>
                        <div className=''>
                            <h1 className='mb-1'>Similar</h1>
                            <Movies category={category} type='similar' id={data.id} />
                        </div>
                    </div>
                    
                </>
                )
        }
            
        </>
    );
}




export default Detail;