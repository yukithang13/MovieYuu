import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiType, { category, movieType, tvType } from '../../api/apiType';
import CardVideo from '../CardVideo/CardVideo';

import './girdvideo.scss'

const GirdVideo = (props) =>{
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0)
    const {keyword} = useParams();
    useEffect(()=>{
        window.scrollTo({ top: 0, behavior: "smooth" });
        const getList = async() =>{
            let reponse = null;
            if(keyword === undefined){
                const params = {};
                switch(props.category){
                    case category.movie:
                        reponse = await apiType.getMoviesList(movieType.popular, {params});
                        break;
                    default:
                        reponse = await apiType.getTvList(tvType.popular, {params});
                }
                    
            }
            else{
                const params = {
                    query: keyword
                }
                reponse = await apiType.search(props.category, {params});
                
            }
            
            setItems(reponse.results);
            
            setTotalPage(reponse.total_pages);
        }
        getList();
    },[props.category, keyword])

    const handleLoadMore = async () => {
        let response = null;
        if (keyword === undefined) {
            const params = {
                page: page + 1
            };
            switch(props.category) { 
                case category.movie:
                    response = await apiType.getMoviesList(movieType.popular, {params});
                    break;
                default:
                    response = await apiType.getTvList(tvType.popular, {params});
                    break;
            }
        } else {
            const params = {
                page: page + 1,
                query: keyword
            }
            response = await apiType.search(props.category, {params});
        }
        setItems([...items, ...response.results]);
        setPage(page + 1);
    }
    return (
        <>
         {/* <input type="text" /> */}
        <div className='gird'>
           
           {
            items.map((item,i) => <CardVideo category={props.category} item={item} key={i} />)
           }
        </div>
        {
            page < totalPage ? (
            <div className='gird__loadmore'>
                <button className='btnoutline' onClick={handleLoadMore}>Load more</button>
            </div>
            ):null
                
            
        }
        </>
    );
}

export default GirdVideo;