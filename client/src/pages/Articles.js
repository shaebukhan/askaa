import React from 'react';
import Header from '../components/Header';
import Afilters from '../components/Afilters';
import Atable from '../components/table/Atable';

const Articles = () => {
    return (
        <>
            <div className="container mx-auto">
                <Header />
                <Afilters />
                <Atable />
            </div>
        </>

    );
};

export default Articles;