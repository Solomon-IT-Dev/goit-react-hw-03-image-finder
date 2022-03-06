import React, { Component } from "react";
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import findImages from "services/imageFinderApi";
import ImageGalleryItem from 'components/ImageGalleryItem';
import FrontNotification from "components/FrontNotification";
import Modal from 'components/Modal';
import Button from 'components/Button';
import Loader from 'components/Loader';
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
        largeImageURL: '',
        showModal: false,
        status: Status.IDLE,
    };

    componentDidUpdate(prevProps, prevState) {
        const prevQuery = prevProps.searchQuery;
        const nextQuery = this.props.searchQuery;
        const prevPage = prevState.page;
        const nextPage = this.state.page;

        if (prevQuery !== nextQuery) {
            this.setState({ status: Status.PENDING });

            findImages(nextQuery, nextPage)
                .then(({ hits, total, totalHits }) => {
                        console.log(hits);
                        console.log(total);
                        console.log(totalHits);

                        this.setState({ imageSet: hits, totalImages: totalHits, status: Status.RESOLVED });
                    })
                .catch(error => {
                        this.setState({ status: Status.REJECTED })
                        this.showQueryError(error);
                        console.log(error);
                    })
        };
    };

    showSearchResult = (totalImages) => {
        toast.success(`Hooray! We found ${totalImages} images.`);
    };

    showGalleryEnd = () => {
        toast.info("You've reached the end of search results.");
    };

    showIncorrectQuery = (searchQuery) => {
        toast.error(`Sorry, there are no images matching your query: "${searchQuery}". Please try to search something else.`);
    };

    showQueryError = (error) => {
        toast.error(`You caught the following error: ${error.message}.`);
    };

    toggleModal = (largeImageURL) => {
        this.setState(({ showModal }) => ({
            showModal: !showModal,
            largeImageURL,
        }));
    };

    onLoadBtnClick = () => {
        const { totalImages, imageSet } = this.state;
        if (totalImages > imageSet.length) {
            this.setState(prevState => ({ page: prevState.page + 1}));
        };
    };

    render() {
        const { imageSet, totalImages, largeImageURL, showModal, status } = this.state;

        if (status === 'idle') {
            return <FrontNotification text="Type your image request in searchbar and get an awesome collection of pictures." />
        };
         
        if (status === 'pending') {
            return <Loader />
        };

        if (status === 'resolved') {
            return (
                <>
                    <GalleryList>
                        {imageSet.map(({ id, webformatURL, largeImageURL, tags }) => (
                            <ImageGalleryItem
                                key={id}
                                webformatURL={webformatURL}
                                largeImageURL={largeImageURL}
                                alt={tags}
                                onClick={this.toggleModal}
                            />
                        ))}
                    </GalleryList>
                    
                    {showModal && <Modal
                        largeImageURL={largeImageURL}
                        alt={this.props.searchQuery}
                        onClose={this.toggleModal}
                    />}

                    {(totalImages > imageSet.length) && <Button onClick={this.onLoadBtnClick} />}
                </>
            );
        };
   
        if (status === 'rejected') {
            return <FrontNotification text="Oops! Something went wrong."/>
        }
    };
 
};

ImageGallery.propTypes = {
    searchQuery: PropTypes.string.isRequired,
};

export default ImageGallery;