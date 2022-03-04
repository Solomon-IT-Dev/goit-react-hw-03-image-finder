import React, { Component } from "react";
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { AppWrapper } from "./App.styled";

class App extends Component {
  state = {
    searchQuery: '',
  };

  onFormSubmit = (searchQuery) => {
    this.setState({ searchQuery });
  };

  render() {
    const { searchQuery } = this.state;

    return (
      <AppWrapper>
        <Searchbar onSubmit={this.onFormSubmit} />
        <ImageGallery searchQuery={searchQuery} />
        <ToastContainer autoClose={3000} />
      </AppWrapper>
    );
  };
};

export default App;