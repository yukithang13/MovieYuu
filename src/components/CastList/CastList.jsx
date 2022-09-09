
import React, { useEffect, useState } from 'react';
import './castlist.scss'
import apiConfig from '../../api/apiConfig';
import apiType from '../../api/apiType';

import { useParams } from 'react-router-dom';

const CastList = (props) => {
   const {category} = useParams();
   const [casts, setCasts] = useState([])
   useEffect(()=>{
        const getCasts = async () =>{
            const response = await apiType.credits(category, props.id);
            setCasts(response.cast.slice(0,10));
            
        }
        getCasts();
   },[category, props.id])

    return (
       <div className='casts'>
        
        {
            casts.map((data,i) =>(
                <div key={i} className='casts__item'>
                    
                    <div className='casts__item-img'  style={{backgroundImage:`url(${apiConfig.w200Image(data.profile_path)})`}}>
                    </div>
                    <p className='casts__item-name'>{data.name}</p>
                </div>
            ))
        }
       </div>
    );
}

         

export default CastList;