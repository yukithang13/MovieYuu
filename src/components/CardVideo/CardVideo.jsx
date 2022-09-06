
import React from 'react';

import './cardvideo.scss';

import { Link } from 'react-router-dom';

import '../button/button.scss';

import { category } from '../../api/apiType';
import apiConfig from '../../api/apiConfig';

const CardVideo = (props) => {

    const item  = props.item;
    const cate =category[props.category];

    const link = cate + '/' + item.id;
    
    const bg = apiConfig.w500Image(item.poster_path);

    return (
        <Link to={link}>
          <div className="movie-card" style={{backgroundImage: `url(${bg})`}}>
            </div>
            <h3>{item.title || item.name}</h3>
        </Link>
    );
}

         

export default CardVideo;