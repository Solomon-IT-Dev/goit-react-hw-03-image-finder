import PropTypes from 'prop-types';
import { GalleryList } from './ImageGallery.styled';

export default function ImageGallery(props) {
    return (
        <GalleryList>
            {props.children}
        </GalleryList>
    );  
};

ImageGallery.propTypes = {
    children: PropTypes.node,
};