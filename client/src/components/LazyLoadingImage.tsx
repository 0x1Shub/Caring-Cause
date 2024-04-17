import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface LazyLoadingImageProps {
    src: string;
    className?: string;
}

const LazyLoadingImage: React.FC<LazyLoadingImageProps> = ({ src, className }) => {
    return (
        <LazyLoadImage
            className={className || ''}
            alt=""
            effect="blur"
            src={src}
        />
    );
};

export default LazyLoadingImage;
