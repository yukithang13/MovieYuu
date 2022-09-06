import React from 'react';

import { useParams } from 'react-router';
import { category as abc} from '../api/apiType';
import GirdVideo from '../components/GirdVideo/GirdVideo';
import PageSub from '../components/page-sub/PageSub'

const Catalog = () => {

    const { category } = useParams();

    return (
        <>
          <PageSub>
                {category === abc.movie ? 'Movies' : 'TV Series'}
            </PageSub>

            <div className="container">
                <div className="section mb-3">
                    <GirdVideo category={category}/>
                </div>
            </div>
        </>
    );
}



export default Catalog;