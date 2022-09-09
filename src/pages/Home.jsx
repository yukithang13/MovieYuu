import React from 'react';
import PosterSlide from '../components/poster-slide/PosterSlide';
import { Link } from 'react-router-dom';
import { category, movieType, tvType } from '../api/apiType';
import Movies from '../components/movies/Movies';
const Home = () =>{
    return (
        <>
            <PosterSlide/>
            
            <div className='container'>
                <div className='section mb-3'>
                    <div className='section__header mb-2 top-search'>
                        <h2>Trending Movies</h2>
                        <Link to="/search">
                            <button className="btnoutline1">Search</button>
                        </Link>
                    </div>
                   
                    <Movies category={category.movie} type={movieType.popular}/>
                </div>
                <div className='section mb-3'>
                    <div className='section__header mb-2'>
                        <h2>Top Rated Movies</h2>
                    </div>
                    <Movies category={category.movie} type={movieType.top_rated}/>
                </div>
                <div className='section mb-3'>
                    <div className='section__header mb-2'>
                        <h2>Trending TV</h2>
                    </div>
                    <Movies category={category.tv} type={tvType.popular}/>
                </div>
                <div className='section mb-3'>
                    <div className='section__header mb-2'>
                        <h2>Top Rated TV</h2>
                    </div>
                    <Movies category={category.tv} type={tvType.top_rated}/>
                </div>
               
            </div>
        </>
    );
}

export default Home;