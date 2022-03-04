import React, { Component } from "react";
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import findImages from "services/imageFinderApi";
import ImageGalleryItem from 'components/ImageGalleryItem';
import FrontNotification from "components/FrontNotification";
import Modal from 'components/Modal';
import Button from 'components/Button';
// import Loader from 'components/Loader';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { GalleryList } from './ImageGallery.styled';

const Status = {
    IDLE: 'idle',
    PENDING: 'pending',
    RESOLVED: 'resolved',
    REJECTED: 'rejected',
};

class ImageGallery extends Component {
    state = {
        imageSet: [],
        page: 1,
        totalImages: 0,
        largeImageURl: '',
        showModal: false,
        // loading: false,
        status: Status.IDLE,
    };

    componentDidUpdate(prevProps, prevState) {
        const prevQuery = prevProps.searchQuery;
        const nextQuery = this.props.searchQuery;
        const { page } = this.state;

        if (prevQuery !== nextQuery) {
            this.setState({ status: Status.PENDING }); // imageSet: null 

            const errorMessage = `no images available on query ${nextQuery}`;

            findImages(nextQuery, page, errorMessage)
                .then(imageSet => this.setState({ imageSet, status: Status.RESOLVED }))
                .catch(error => {
                        this.setState({ status: Status.REJECTED })
                        this.showQueryError(error);
                        console.log(error);
                    })
                // .finally(() => this.setState({ loading: false }));
        };
    };

    toggleModal = () => {
        this.setState(({ showModal }) => ({
            showModal: !showModal
        }));
    };

    showQueryError = (error) => {
        toast.error(`Oops! Something went wrong. You caught the following error: ${error.message}.`);
    };

    render() {
        const { showModal, status } = this.state; // loading

        if (status === Status.IDLE) {
            return <FrontNotification text='Type your image request in searchbar and get an awesome collection of pictures.' />
        };
         
        if (status === Status.PENDING || status === Status.RESOLVED) {
            return (
                <>
                    <GalleryList>
                        <ImageGalleryItem />

                    </GalleryList>
                    <button type="button" onClick={this.toggleModal}>Open</button>
                    {showModal && <Modal onClose={this.toggleModal} />}

                    <Button />
                    {/* {loading ? <Loader /> : <Button />} */}
                </>
            );
        };
   
        if (status === Status.REJECTED) {
            return <FrontNotification text='Oops! Something went wrong.'/>
        }
    };
 
};

ImageGallery.propTypes = {
    searchQuery: PropTypes.string.isRequired,
};

export default ImageGallery;