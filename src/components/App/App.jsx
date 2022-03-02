import React, { Component } from "react";
import findImages from "services/imageFinderApi";
import Searchbar from 'components/Searchbar';
// import ImageGallery from 'components/ImageGallery';
// import ImageGalleryItem from 'components/ImageGalleryItem';
import Modal from 'components/Modal';
// import Button from 'components/Button';
// import Loader from 'components/Loader';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { AppWrapper } from "./App.styled";

class App extends Component {
  state = {
    showModal: false,
    loading: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal
    }));
  };

  render() {
    const { showModal } = this.state;

    return (
      <AppWrapper>
        <Searchbar />

        <button type="button" onClick={this.toggleModal}>Open</button>

        {showModal && <Modal onClose={this.toggleModal} />}
      </AppWrapper>
    );
  };
};

export default App;