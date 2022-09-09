import React, { useRef } from 'react';
import apiType, {category, movieType} from '../../api/apiType'
import apiConfig from '../../api/apiConfig';
import './poster-slide.scss';
import '../button/button.scss'
import "swiper/css";
import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Modal, { ModalContent } from '../modal/Modal';

const PosterSlide = () =>{
    SwiperCore.use([Autoplay]);
    const [movieItems, setMovieItems] = useState([]);
    useEffect(() =>{
        window.scrollTo({ top: 0, behavior: "smooth" });
        const getMovies = async () => {
            const params = {page: 1}
            try {
                const response = await apiType.getMoviesList(movieType.popular, {params});
                setMovieItems(response.results.slice(0, 5));
                
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
                grabCursor={false}
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{delay: 6000,disableOnInteraction: true}}
            >
                {movieItems.map((item, i) => (
                    <SwiperSlide key={i}>
                        {({ isActive}) =>(
                            <PosterSlideItem item={item} className={`${isActive ? 'active' : ''}`} />
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>
            {
                movieItems.map((item, i) => <TrailerModal key={i} item={item}/>)
            }
        </div>
    );
}


const PosterSlideItem = props => {

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
            className={`poster-slide__item ${props.className}`}
            style={{backgroundImage: `url(${background})`}}
        >
            <div className="poster-slide__item__content container">
                <div className="poster-slide__item__content__info">
                    <h2 className="title">{item.title}</h2>
                    <div className="overview">{item.overview}</div>
                    <div className="btns">
                        <button className='btn' onClick={ () =>hisrory.push('/movie/' + item.id)}>
                            Watch movie
                        </button>
                        <button className='btnoutline' onClick={setModalActive}>
                            Watch trailer
                        </button>
                    </div>
                </div>
                <div className="poster-slide__item__content__path">
                    <img src={apiConfig.w500Image(item.poster_path)} alt="" />
                </div>
            </div>
        </div>
    )
}

const TrailerModal = props => {
    const item = props.item;
    const iframeRef = useRef(null);
    const onClose = () => iframeRef.current.setAttribute('src', '');
    return (
        <Modal active={false} id={`modal_${item.id}`}>
            <ModalContent onClose={onClose}>
                <iframe ref={iframeRef} width="100%" height="500px" title="trailer"></iframe>
            </ModalContent>
        </Modal>
    )
}

export default PosterSlide;