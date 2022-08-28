import React from 'react';
import apiType, {category, movieType} from '../../api/apiType'
import apiConfig from '../../api/apiConfig';
import './poster-slide.scss';
import Button, { OutlineButton } from '../button/Button';

import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

const PosterSlide = () =>{
    SwiperCore.use([Autoplay]);
    const [movieItems, setMovieItems] = useState([]);
    useEffect(() =>{
        const getMovies = async () => {
            const params = {page: 1}
            try {
                const response = await apiType.getMoviesList(movieType.popular, {params});
                setMovieItems(response.results.slice(0, 4));
                console.log(response);
            } catch {
                console.log('error');
            }
        }
        getMovies();
    },[]);
    
    return (
        <div className='poster-slide'>
              <Swiper
                modules={[Autoplay]}
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{delay: 5000}}
            >
                {movieItems.map((item, i) => (
                    <SwiperSlide key={i}>
                        {({ isActive}) =>(
                            <HeroSlideItem item={item} className={`${isActive ? 'active' : ''}`} />
                        )}
                    </SwiperSlide>
                ))}

            </Swiper>
        </div>
    );
}


const HeroSlideItem = props => {

    let hisrory = useHistory();

    const item = props.item;

    const background = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path);

    const setModalActive = async () => {
        const modal = document.querySelector(`#modal_${item.id}`);

        const videos = await apiType.getVideos(category.movie, item.id);

        if (videos.results.length > 0) {
            const videSrc = 'https://www.youtube.com/embed/' + videos.results[0].key;
            modal.querySelector('.modal__content > iframe').setAttribute('src', videSrc);
        } else {
            modal.querySelector('.modal__content').innerHTML = 'No trailer';
        }

        modal.classList.toggle('active');
    }

    return (
        <div
            className={`hero-slide__item ${props.className}`}
            style={{backgroundImage: `url(${background})`}}
        >
            <div className="hero-slide__item__content container">
                <div className="hero-slide__item__content__info">
                    <h2 className="title">{item.title}</h2>
                    <div className="overview">{item.overview}</div>
                    <div className="btns">
                        <Button onClick={() => hisrory.push('/movie/' + item.id)}>
                            Watch now
                        </Button>
                        <OutlineButton onClick={setModalActive}>
                            Watch trailer
                        </OutlineButton>
                    </div>
                </div>
                <div className="hero-slide__item__content__path">
                    <img src={apiConfig.w500Image(item.poster_path)} alt="" />
                </div>
            </div>
        </div>
    )
}

export default PosterSlide;