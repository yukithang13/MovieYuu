import React from 'react';

import { useParams } from 'react-router';
import { category} from '../api/apiType';
import GirdVideo from '../components/GirdVideo/GirdVideo';
import PageSub from '../components/page-sub/PageSub'

const Catalog = () => {

    const { category1 } = useParams();

    return (
        <>
          <PageSub>
                {category === category.movie ? 'Movies' : 'TV Series'}
            </PageSub>

            <div className="container">
                <div className="section mb-3">
                    <GirdVideo category={category1}/>
                </div>
            </div>
        </>
    );
}



export default Catalog;