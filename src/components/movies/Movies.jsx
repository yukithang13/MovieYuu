import React, { useEffect, useState } from 'react';
import apiType, {category} from '../../api/apiType'
import apiConfig from '../../api/apiConfig';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import { Autoplay } from 'swiper';
import "swiper/css";
import './movies.scss';
import PropTypes from 'prop-types';
const Movies = (props) =>{
    const [items, setItems] = useState([]);
    const handleTop = () =>{
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    useEffect(() =>{
        
        const getList = async () =>{
            
             const params = {};
             let response = null;
             if(props.type !== 'similar'){
                
                switch (props.category) {
                    case category.movie:
                        response = await apiType.getMoviesList(props.type,{params});
                        break;

                    default:
                        response = await apiType.getTvList(props.type,{params});
                        break;
                }
             }
             else{
                response = await apiType.similar(props.category, props.id);
             }
             
             setItems(response.results)
        }
        getList();
    })
    return (
        <div className='movies'>
            <Swiper  
                modules={[Autoplay]}
                grabCursor={true}
                spaceBetween={15}
                slidesPerView={'auto'}
                autoplay={{delay: 4000,disableOnInteraction: true}}
                
            >
                 {items.map((item, i) => (
                    <SwiperSlide key={i}>   
                         <Link to={`/${category[props.category]}/${item.id}`} onClick={handleTop} alt='movie-img'>
                          <img src={apiConfig.w500Image(item.poster_path)} alt="" />
                          <h4>{item.title}</h4>
                          </Link>
                    </SwiperSlide>
                ))}

               

            </Swiper>
        </div>
    );
}

Movies.propTypes ={
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
}

export default Movies;