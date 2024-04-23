import { Link } from "react-router-dom";


import LazyLoadingImage from '../../components/LazyLoadingImage';

import backgroundImage from '../../assets/background.jpg';

const HeroBanner = () => {

    return (
        <div className="hero-banner">
            <LazyLoadingImage src={backgroundImage} className={'img'} />

            <div className="hero-banner-content">
                <h1>Welcome to Caring Cause</h1>
                <p>Your platform for crowdfunding and making a difference!</p>
                <div className='btn'>
                    <Link className='text' to={'/campaigns/create'}>Start a fundraiser</Link>
                </div>
            </div>
        </div>
    );
}

export default HeroBanner;
