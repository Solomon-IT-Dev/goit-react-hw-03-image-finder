import React, { Component } from "react";
import Modal from 'components/Modal';
import { AppWrapper } from "./App.styled";

class App extends Component {
  state = {
    showModal: false,
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
        <button type="button" onClick={this.toggleModal}>Open</button>

        {showModal && <Modal onClose={this.toggleModal} />}
      </AppWrapper>
    );
  };
};

export default App;