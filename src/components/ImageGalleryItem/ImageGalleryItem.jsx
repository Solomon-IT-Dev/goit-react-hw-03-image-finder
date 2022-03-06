import PropTypes from 'prop-types';
import { GalleryItem, GalleryImg } from './ImageGalleryItem.styled';

export default function ImageGalleryItem({ webformatURL, largeImageURL, alt, onClick }) {
    return (
        <GalleryItem>
            <GalleryImg src={webformatURL} alt={alt} onClick={() => onClick(largeImageURL)} />
        </GalleryItem>
    );  
};

ImageGalleryItem.propTypes = {
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};