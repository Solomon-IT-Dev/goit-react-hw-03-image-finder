import React, { Component } from "react";
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';
import { ModalBackdrop, ModalContainer } from './Modal.styled';

const modalRoot = document.getElementById('modal-root');

class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.onKeyDown);
    };

    componentWillUnmount() {
        window.removeEventListener('keydown', this.onKeyDown);
    };

    onKeyDown = e => {
        if (e.code === 'Escape') {
            this.props.onClose();
        };
    };

    onBackdropClick = e => {
        if (e.currentTarget === e.target) {
            this.props.onClose();
        };
    };

    render() {
        return createPortal(
            <ModalBackdrop onClick={this.onBackdropClick}>
                <ModalContainer>
                    <button type="button" onClick={this.props.onClose}>Close</button>
                    {/* <img src="" alt="" /> */}
                </ModalContainer>
            </ModalBackdrop>,
            modalRoot,
        );
    };
};

export default Modal;

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
};