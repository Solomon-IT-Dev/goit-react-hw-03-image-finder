import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem';
import { GalleryList } from './ImageGallery.styled';

export default function ImageGallery({ imagesSet, onClick }) {
    return (
        <GalleryList >
            {imagesSet.map(({ id, webformatURL, largeImageURL, tags }) => (
                <ImageGalleryItem
                    key={id}
                    webformatURL={webformatURL}
                    largeImageURL={largeImageURL}
                    alt={tags}
                    onClick={onClick}
                />
            ))}
        </GalleryList>
    );
};

ImageGallery.propTypes = {
    imagesSet: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
};

// ref={(galleryList) => { this.galleryElem = galleryList }}