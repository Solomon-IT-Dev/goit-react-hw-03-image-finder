import React, { Component } from "react";
import { toast } from 'react-toastify';
import findImages from "services/imageFinderApi";
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import FrontNotification from "components/FrontNotification";
import Modal from 'components/Modal';
import Button from 'components/Button';
import Loader from 'components/Loader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { AppWrapper } from "./App.styled";

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class App extends Component {
  state = {
    searchQuery: '',
    imagesSet: [],
    page: 1,
    totalImages: 0,
    largeImageURL: '',
    showModal: false,
    status: Status.IDLE,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.searchQuery;
    const nextQuery = this.state.searchQuery;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevQuery !== nextQuery) {
      this.setState({ imagesSet: [], page: 1, status: Status.PENDING });
    };

    if (prevQuery !== nextQuery || prevPage !== nextPage) {
      findImages(nextQuery, nextPage)
        .then(({ hits, totalHits }) => {
          if (nextPage === 1) {
            this.setState({ imagesSet: hits, totalImages: totalHits });

            if (totalHits === 0) {
              this.setState({ status: Status.REJECTED });
              setTimeout(() => {
                this.setState({ status: Status.IDLE });
              }, 3000);
              return this.showIncorrectQuery(nextQuery);
            };

            if (totalHits !== 0) {
              this.setState({ status: Status.RESOLVED });
              return this.showSearchResult(totalHits);
            };
          } else {
            this.setState(prevState => ({ imagesSet: [...prevState.imagesSet, ...hits], status: Status.RESOLVED }));
            // this.makeSmoothScroll();
          };
        })
        .catch(error => {
          console.log(error);
          this.setState({ status: Status.REJECTED });
          setTimeout(() => {
            this.setState({ status: Status.IDLE });
          }, 3000);
          return this.showQueryError(error);
        })
    };
  };

  showSearchResult = (totalImages) => {
    toast.success(`Hooray! We found ${totalImages} images.`);
  };

  showIncorrectQuery = (searchQuery) => {
    toast.error(`Sorry, there are no images matching your query: "${searchQuery}". Please try to search something else.`);
  };

  showQueryError = (error) => {
    toast.error(`You caught the following error: ${error.message}.`);
  };
  
  onFormSubmit = (searchQuery) => {
    this.setState({ searchQuery });
  };

  // makeSmoothScroll = () => {
  //   const cardHeight = this.galleryElem.firstElementChild.clientHeight;
  //   window.scrollBy({ top: cardHeight * 1.97, behavior: 'smooth' });
  // };

  toggleModal = (largeImageURL) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeImageURL,
    }));
  };

  onLoadBtnClick = () => {
    const { totalImages, imagesSet } = this.state;

    if (totalImages > imagesSet.length) {
      this.setState(prevState => ({ page: prevState.page + 1 }));
    };
  };

  render() {
    const { searchQuery, imagesSet, totalImages, largeImageURL, showModal, status } = this.state;

    return (
      <AppWrapper>
        <Searchbar onSubmit={this.onFormSubmit} />
        {status === Status.IDLE && <FrontNotification text="Type your image request in searchbar and get an awesome collection of pictures." />}
        {status === Status.PENDING && <Loader />}
        {status === Status.RESOLVED && <>
          <ImageGallery
            imagesSet={imagesSet}
            onClick={this.toggleModal}
            
          />
          
          {showModal && <Modal
            largeImageURL={largeImageURL}
            alt={searchQuery}
            onClose={this.toggleModal}
          />}
          
          {(totalImages > imagesSet.length) && <Button onClick={this.onLoadBtnClick} />}
        </>}
        {status === Status.REJECTED && <FrontNotification text="Oops! Something went wrong."/>}
        <ToastContainer autoClose={4000} />
      </AppWrapper>
    );
  };
};

export default App;